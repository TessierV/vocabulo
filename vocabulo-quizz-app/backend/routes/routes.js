// /backend/routes/routes
const express = require('express');
const { pool } = require('../config/db');


const router = express.Router();

// Route to check the connection to the PostgreSQL database
router.get('/api/test-connection', async (req, res) => {
  try {
    // Connect to the PostgreSQL pool
    const client = await pool.connect();
    // Send a success message if the connection is successful
    res.send('Successfully connected to PostgreSQL');
    // Release the client after use
    client.release();
  } catch (err) {
    // Log the error if the connection fails and return an error message
    console.error('Error connecting to PostgreSQL:', err.message);
    res.status(500).send('Error connecting to PostgreSQL');
  }
});


// Route to fetch categories with the number of words associated, including words from subcategories
router.get('/api/subcategories', async (req, res) => {
  try {
    const query = `
      WITH SubcategoryDetails AS (
        SELECT
          sc.subcat_id,
          sc.categorie_id,
          sc.name AS subcategory_name,
          ms.mot_id,
          m.mot,
          m.definition,
          lsf.url_sign,
          lsf.url_def
        FROM
          subcategory sc
        LEFT JOIN
          mot_subcategory ms ON sc.subcat_id = ms.subcat_id
        LEFT JOIN
          mot m ON ms.mot_id = m.mot_id
        LEFT JOIN
          lsf_signe lsf ON m.mot_id = lsf.mot_id
      ),
      SubcategoryWords AS (
        SELECT
          sc.categorie_id,
          sc.subcat_id,
          sc.subcategory_name,
          COUNT(sc.mot_id) AS subcategory_word_count,
          json_agg(json_build_object(
            'mot_id', sc.mot_id,
            'mot', sc.mot,
            'definition', sc.definition,
            'url_sign', sc.url_sign,
            'url_def', sc.url_def
          )) AS words
        FROM
          SubcategoryDetails sc
        GROUP BY
          sc.categorie_id, sc.subcat_id, sc.subcategory_name
      ),
      CategoryWords AS (
        SELECT
          c.categorie_id,
          c.name AS categorie_name,
          COUNT(m.mot_id) AS category_word_count,
          COALESCE(SUM(scw.subcategory_word_count), 0) AS subcategory_total_word_count
        FROM
          categorie c
        LEFT JOIN
          mot_categorie mc ON c.categorie_id = mc.categorie_id
        LEFT JOIN
          mot m ON mc.mot_id = m.mot_id
        LEFT JOIN
          SubcategoryWords scw ON c.categorie_id = scw.categorie_id
        GROUP BY
          c.categorie_id, c.name
      )
      SELECT
        cw.categorie_id,
        cw.categorie_name,
        cw.category_word_count + cw.subcategory_total_word_count AS word_count,
        json_agg(json_build_object(
          'subcategory_id', sw.subcat_id,
          'subcategory_name', sw.subcategory_name,
          'subcategory_word_count', sw.subcategory_word_count,
          'words', sw.words
        )) AS subcategories
      FROM
        CategoryWords cw
      LEFT JOIN
        SubcategoryWords sw ON cw.categorie_id = sw.categorie_id
      GROUP BY
        cw.categorie_id, cw.categorie_name, cw.category_word_count, cw.subcategory_total_word_count
      ORDER BY
        cw.categorie_name;
    `;

    // Execute the query and return the results as JSON
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    // Log the error and send a 500 status if something goes wrong
    console.error('Error fetching data:', err.message);
    res.status(500).send('Error fetching data');
  }
});

// Route to fetch categories along with their subcategories and associated words
router.get('/api/categories', async (req, res) => {
  try {
    const categoriesQuery = `
      SELECT c.categorie_id, c.name AS categorie_name
      FROM categorie c
    `;

    // Fetch the categories
    const categoriesResult = await pool.query(categoriesQuery);
    const categories = categoriesResult.rows;

    for (const category of categories) {
      // Fetch subcategories for each category
      const subcategoriesQuery = `
        SELECT s.subcat_id, s.name AS subcategory_name
        FROM subcategory s
        WHERE s.categorie_id = $1
      `;
      const subcategoriesResult = await pool.query(subcategoriesQuery, [category.categorie_id]);
      category.subcategories = subcategoriesResult.rows;

      let totalWordsInCategory = 0;

      // Fetch words for each subcategory and count them
      for (const subcategory of category.subcategories) {
        const wordsQuery = `
          SELECT
            m.mot_id,
            m.mot,
            m.definition,
            json_agg(json_build_object(
              'signe_id', ls.signe_id,
              'url_sign', ls.url_sign,
              'url_def', ls.url_def
            )) AS signes
          FROM
            mot m
          LEFT JOIN
            mot_subcategory ms ON m.mot_id = ms.mot_id
          LEFT JOIN
            lsf_signe ls ON m.mot_id = ls.mot_id
          WHERE
            ms.subcat_id = $1
          GROUP BY
            m.mot_id, m.mot, m.definition
          ORDER BY
            m.mot
        `;
        const wordsResult = await pool.query(wordsQuery, [subcategory.subcat_id]);
        subcategory.words = wordsResult.rows;

        // Count the words in the subcategory
        subcategory.wordCount = subcategory.words.length;
        totalWordsInCategory += subcategory.wordCount;
      }

      // Fetch words directly associated with the category (without subcategories)
      const categoryWordsQuery = `
        SELECT
          m.mot_id,
          m.mot,
          m.definition,
          json_agg(json_build_object(
            'signe_id', ls.signe_id,
            'url_sign', ls.url_sign,
            'url_def', ls.url_def
          )) AS signes
        FROM
          mot m
        LEFT JOIN
          mot_categorie mc ON m.mot_id = mc.mot_id
        LEFT JOIN
          lsf_signe ls ON m.mot_id = ls.mot_id
        WHERE
          mc.categorie_id = $1
          AND m.mot_id NOT IN (SELECT mot_id FROM mot_subcategory WHERE subcat_id IN (SELECT subcat_id FROM subcategory WHERE categorie_id = $1))
        GROUP BY
          m.mot_id, m.mot, m.definition
        ORDER BY
          m.mot
      `;
      const categoryWordsResult = await pool.query(categoryWordsQuery, [category.categorie_id]);
      category.categoryWords = categoryWordsResult.rows;

      // Count the words directly in the category
      category.wordCount = category.categoryWords.length;
      totalWordsInCategory += category.wordCount;

      // Add the total word count for the category (including subcategories)
      category.totalWordCount = totalWordsInCategory;
    }

    // Return the categories as JSON
    res.json(categories);
  } catch (err) {
    // Log the error and send a 500 status if something goes wrong
    console.error('Error fetching categories:', err.message);
    res.status(500).send('Error fetching categories');
  }
});

// New route to fetch words and subcategories for a specific category
router.get('/api/words/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Fetch the category name
    const categoryNameQuery = `
                  SELECT name
                  FROM categorie
                  WHERE categorie_id = $1
              `;
    const categoryNameResult = await pool.query(categoryNameQuery, [categoryId]);

    if (categoryNameResult.rows.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    const categoryName = categoryNameResult.rows[0].name;

    // Fetch the subcategories for the category
    const subcategoriesQuery = `
                  SELECT s.subcat_id, s.name AS subcategory_name
                  FROM subcategory s
                  WHERE s.categorie_id = $1
              `;
    const subcategoriesResult = await pool.query(subcategoriesQuery, [categoryId]);
    console.log('Subcategories Result:', subcategoriesResult.rows);

    const subcategories = subcategoriesResult.rows;

    // Fetch words directly associated with the category
    const categoryWordsQuery = `
                  SELECT
                      m.mot_id,
                      m.mot,
                      m.definition,
                      json_agg(json_build_object(
                          'signe_id', ls.signe_id,
                          'url_sign', ls.url_sign,
                          'url_def', ls.url_def
                      )) AS signes
                  FROM
                      mot m
                  LEFT JOIN
                      mot_categorie mc ON m.mot_id = mc.mot_id
                  LEFT JOIN
                      lsf_signe ls ON m.mot_id = ls.mot_id
                  WHERE
                      mc.categorie_id = $1
                  GROUP BY
                      m.mot_id, m.mot, m.definition
                  ORDER BY
                      m.mot
              `;
    const categoryWordsResult = await pool.query(categoryWordsQuery, [categoryId]);
    console.log('Category Words Result:', categoryWordsResult.rows);

    // Prepare the response object
    const result = {
      categorie_id: categoryId,
      categorie_name: categoryName,
      categoryWords: categoryWordsResult.rows,
      subcategories: []
    };

    // Add subcategories with their words
    for (const subcategory of subcategories) {
      const subcategoryWordsQuery = `
                      SELECT
                          m.mot_id,
                          m.mot,
                          m.definition,
                          json_agg(json_build_object(
                              'signe_id', ls.signe_id,
                              'url_sign', ls.url_sign,
                              'url_def', ls.url_def
                          )) AS signes
                      FROM
                          mot m
                      LEFT JOIN
                          mot_subcategory ms ON m.mot_id = ms.mot_id
                      LEFT JOIN
                          lsf_signe ls ON m.mot_id = ls.mot_id
                      WHERE
                          ms.subcat_id = $1
                      GROUP BY
                          m.mot_id, m.mot, m.definition
                      ORDER BY
                          m.mot
                  `;
      const subcategoryWordsResult = await pool.query(subcategoryWordsQuery, [subcategory.subcat_id]);
      console.log(`Subcategory Words Result for ${subcategory.subcategory_name}:`, subcategoryWordsResult.rows);

      result.subcategories.push({
        subcat_id: subcategory.subcat_id,
        subcategory_name: subcategory.subcategory_name,
        words: subcategoryWordsResult.rows,
        wordCount: subcategoryWordsResult.rows.length
      });
    }

    // Return the response object as JSON
    res.json(result);
  } catch (error) {
    console.error('Erreur lors de la récupération des mots:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des mots' });
  }
});

// Route for retrieving data for the 'Basique' category page
router.get('/api/categories/basique', async (req, res) => {
  try {
    // Fetch the "Basique" category
    const categoryQuery = `
            SELECT c.categorie_id, c.name AS categorie_name
            FROM categorie c
            WHERE c.name = 'basique';
          `;
    const categoryResult = await pool.query(categoryQuery);

    if (categoryResult.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const category = categoryResult.rows[0];

    // Fetch subcategories for this category with word count
    const subcategoriesQuery = `
            SELECT
              s.subcat_id,
              s.name AS subcategory_name,
              COUNT(m.mot_id) AS word_count
            FROM
              subcategory s
            LEFT JOIN
              mot_subcategory ms ON s.subcat_id = ms.subcat_id
            LEFT JOIN
              mot m ON ms.mot_id = m.mot_id
            WHERE
              s.categorie_id = $1
            GROUP BY
              s.subcat_id, s.name;
          `;
    const subcategoriesResult = await pool.query(subcategoriesQuery, [category.categorie_id]);
    category.subcategories = subcategoriesResult.rows;

    // Loop through subcategories to retrieve words and sign data
    for (const subcategory of category.subcategories) {
      const wordsQuery = `
              SELECT
                m.mot_id,
                m.mot,
                m.definition,
                json_agg(json_build_object(
                  'signe_id', ls.signe_id,
                  'url_sign', ls.url_sign,
                  'url_def', ls.url_def
                )) AS signes
              FROM
                mot m
              LEFT JOIN
                mot_subcategory ms ON m.mot_id = ms.mot_id
              LEFT JOIN
                lsf_signe ls ON m.mot_id = ls.mot_id
              WHERE
                ms.subcat_id = $1
              GROUP BY
                m.mot_id, m.mot, m.definition
              ORDER BY
                m.mot;
            `;
      const wordsResult = await pool.query(wordsQuery, [subcategory.subcat_id]);
      subcategory.words = wordsResult.rows;
    }
    // Return the full category data as JSON
    res.json(category);
  } catch (err) {
    console.error('Error retrieving the Basique category:', err.message);
    res.status(500).send('Server error');
  }
});

// Route for fetching subcategories and words for the "Basique" category quiz
router.get('/api/categories/basique/:id', async (req, res) => {
  const { id } = req.params;

  console.log(`Received ID: ${id}`); // Debugging line

  try {
    if (!id) {
      return res.status(400).json({ error: 'ID de sous-catégorie requis' });
    }
    // Fetch the subcategory by ID
    const subcategoryQuery = `
            SELECT s.subcat_id, s.name AS subcategory_name
            FROM subcategory s
            WHERE s.subcat_id = $1
          `;
    const subcategoryResult = await pool.query(subcategoryQuery, [id]);

    if (subcategoryResult.rows.length === 0) {
      return res.status(404).json({ error: 'Sous-catégorie non trouvée' });
    }

    const subcategory = subcategoryResult.rows[0];

    // Fetch words associated with the subcategory
    const wordsQuery = `
            SELECT
              m.mot_id,
              m.mot,
              m.definition,
              json_agg(json_build_object(
                'signe_id', ls.signe_id,
                'url_sign', ls.url_sign,
                'url_def', ls.url_def
              )) AS signes
            FROM
              mot m
            LEFT JOIN
              mot_subcategory ms ON m.mot_id = ms.mot_id
            LEFT JOIN
              lsf_signe ls ON m.mot_id = ls.mot_id
            WHERE
              ms.subcat_id = $1
            GROUP BY
              m.mot_id, m.mot, m.definition
            ORDER BY
              m.mot
          `;
    const wordsResult = await pool.query(wordsQuery, [id]);

    subcategory.words = wordsResult.rows;

    console.log("Response Data:", subcategory); // Debugging line

    // Return the subcategory with associated words as JSON
    res.json(subcategory);
  } catch (err) {
    console.error('Erreur lors de la récupération des sous-catégories:', err.message);
    res.status(500).send('Erreur lors de la récupération des sous-catégories');
  }
});


// Route to search for words by the alphabet and search term
router.get('/api/alphabet/search', async (req, res) => {
  const { searchTerm = '' } = req.query;

  try {
    if (!searchTerm) {
      return res.status(400).json({ error: 'Terme de recherche requis' });
    }

    // Query to fetch words matching the search term
    const searchQuery = `
            SELECT
              a.alphabet_id,
              a.letter,
              m.mot_id,
              m.mot,
              m.definition,
              m.frequence,
              g.name AS grammatical_category,
              json_agg(json_build_object(
                'signe_id', ls.signe_id,
                'url_sign', ls.url_sign,
                'url_def', ls.url_def
              )) AS signes
            FROM
              alphabet a
            LEFT JOIN
              mot m ON a.alphabet_id = m.alphabet_id
            LEFT JOIN
              grammatical_cat g ON m.gramm_id = g.gramm_id
            LEFT JOIN
              lsf_signe ls ON m.mot_id = ls.mot_id
            WHERE
              m.mot ILIKE $1 -- Recherche fléchée insensible à la casse
            GROUP BY
              a.alphabet_id, a.letter, m.mot_id, m.mot, m.definition, m.frequence, g.name
            ORDER BY
              a.letter, m.mot
          `;

    // Query to get the total number of matching words
    const countQuery = `
            SELECT COUNT(*)
            FROM mot
            WHERE mot ILIKE $1
          `;

    // Execute both queries in parallel
    const [searchResult, countResult] = await Promise.all([
      pool.query(searchQuery, [`%${searchTerm}%`]),
      pool.query(countQuery, [`%${searchTerm}%`])
    ]);

    // Prepare the result
    const result = searchResult.rows;
    const totalCount = countResult.rows[0].count;

    // Send the results and total word count
    res.json({ totalCount, words: result });
  } catch (err) {
    console.error('Erreur lors de la recherche des mots:', err.message);
    res.status(500).send('Erreur lors de la recherche des mots');
  }
});

// Route to get user information by user_id
router.get('/api/authentication/:user_id', async (req, res) => {
  const { user_id } = req.params;  // Get the user_id in the url parameters

  try {
    // Query to fetch user info from the authentication table
    const userQuery = `
      SELECT
        user_id,
        pseudo,
        password,
        date,
        quiz_id,
        token_id
      FROM authentication
      WHERE user_id = $1;
    `;

    // Query to fetch user word history, words, and sign data
    const historyQuery = `
      SELECT
        uwh.mot_id,
        uwh.last_seen,
        uwh.times_seen,
        uwh.times_correct,
        m.mot,
        m.definition,
        lsf.url_sign,
        lsf.url_def
      FROM user_word_history uwh
      LEFT JOIN mot m ON uwh.mot_id = m.mot_id
      LEFT JOIN lsf_signe lsf ON m.mot_id = lsf.mot_id
      WHERE uwh.user_id = $1;
    `;

    // Execute both queries in parallel
    const [userResult, historyResult] = await Promise.all([
      pool.query(userQuery, [user_id]),
      pool.query(historyQuery, [user_id]),
    ]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = userResult.rows[0];  // Get user info
    const history = historyResult.rows;  // Get history of the word

    // Return user info and word history as JSON
    res.json({
      user,
      word_history: history
    });

  } catch (err) {
    console.error('Erreur lors de la récupération des informations utilisateur et de l\'historique des mots:', err.message);
    res.status(500).send('Erreur lors de la récupération des informations');
  }
});

// Route to search for a word definition for the AI quiz
router.get('/api/mot/:mot_id', async (req, res) => {
  const { mot_id } = req.params;

  try {
    // Query to fetch the word and definition by mot_id
    const result = await pool.query(
      'SELECT mot, definition FROM mot WHERE mot_id = $1',
      [mot_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mot not found' });
    }
    // Send the word and definition as JSON
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching mot data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Login authentication
// Route to authenticate user by pseudo and password
// Login authentication
// Route to authenticate user by pseudo and password
router.get('/api/authentication', async (req, res) => {
  const { pseudo, password } = req.query; // Get pseudo and password from query parameters

  try {
    // Query to fetch user info from the authentication table based on pseudo and password
    const userQuery = `
      SELECT
        user_id,
        pseudo,
        password,
        date,
        quiz_id,
        token_id
      FROM authentication
      WHERE pseudo = $1 AND password = $2;
    `;

    const userResult = await pool.query(userQuery, [pseudo, password]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = userResult.rows[0]; // Get user info

    // Fetch user word history and other related data
    const historyQuery = `
      SELECT
        uwh.mot_id,
        uwh.last_seen,
        uwh.times_seen,
        uwh.times_correct,
        m.mot,
        m.definition,
        lsf.url_sign,
        lsf.url_def
      FROM user_word_history uwh
      LEFT JOIN mot m ON uwh.mot_id = m.mot_id
      LEFT JOIN lsf_signe lsf ON m.mot_id = lsf.mot_id
      WHERE uwh.user_id = $1;
    `;

    const historyResult = await pool.query(historyQuery, [user.user_id]);
    const history = historyResult.rows; // Get history of the word

    // Return user info and word history as JSON
    res.json({
      user,
      word_history: history,
    });

  } catch (err) {
    console.error('Error during user authentication:', err.message);
    res.status(500).json({ message: 'Error during authentication' });
  }
});




module.exports = router;
