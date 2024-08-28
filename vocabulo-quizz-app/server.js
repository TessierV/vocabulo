const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config({ path: '../BDD/quick_setup/.env' });

const app = express();
const port = 3000;

// Configuration de la connexion à PostgreSQL
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Route pour vérifier la connexion à la base de données
app.get('/api/test-connection', async (req, res) => {
  try {
    const client = await pool.connect();
    res.send('Connexion réussie à PostgreSQL');
    client.release();
  } catch (err) {
    console.error('Erreur lors de la connexion à PostgreSQL:', err.message);
    res.status(500).send('Erreur lors de la connexion à PostgreSQL');
  }
});

// Route pour récupérer les catégories avec le nombre de mots associés
// Route pour récupérer les catégories avec le nombre de mots associés, y compris ceux des sous-catégories
app.get('/api/subcategories', async (req, res) => {
  try {
    const query = `
      WITH SubcategoryWords AS (
        SELECT
          sc.subcat_id,
          sc.categorie_id,
          sc.name AS subcategory_name,
          COUNT(ms.mot_id) AS subcategory_word_count
        FROM
          subcategory sc
        LEFT JOIN
          mot_subcategory ms ON sc.subcat_id = ms.subcat_id
        GROUP BY
          sc.subcat_id
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
          'subcategory_id', sc.subcat_id,
          'subcategory_name', sc.subcategory_name,
          'subcategory_word_count', sc.subcategory_word_count
        )) AS subcategories
      FROM
        CategoryWords cw
      LEFT JOIN
        SubcategoryWords sc ON cw.categorie_id = sc.categorie_id
      GROUP BY
        cw.categorie_id, cw.categorie_name, cw.category_word_count, cw.subcategory_total_word_count
      ORDER BY
        cw.categorie_name;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err.message);
    res.status(500).send('Erreur lors de la récupération des données');
  }
});


// Route pour récupérer les mots associés à une catégorie spécifique
app.get('/api/words/:categorieId', async (req, res) => {
  const categorieId = req.params.categorieId; // UUID ou entier, selon votre base de données

  try {
    const query = `
      SELECT
        m.mot_id,
        m.mot
      FROM
        mot m
      JOIN
        mot_categorie mc ON m.mot_id = mc.mot_id
      WHERE
        mc.categorie_id = $1
      ORDER BY
        m.mot;
    `;

    const result = await pool.query(query, [categorieId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des mots:', err.message);
    res.status(500).send('Erreur lors de la récupération des mots');
  }
});

// Route par défaut pour attraper les requêtes non définies
app.use('*', (req, res) => {
  res.status(404).send('Route non trouvée');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});