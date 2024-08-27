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
app.get('/api/subcategories', async (req, res) => {
  try {
    const query = `
      SELECT
        c.categorie_id,
        c.name AS categorie_name,
        COUNT(m.mot_id) AS word_count
      FROM
        categorie c
      LEFT JOIN
        mot_categorie mc ON c.categorie_id = mc.categorie_id
      LEFT JOIN
        mot m ON mc.mot_id = m.mot_id
      GROUP BY
        c.categorie_id, c.name
      ORDER BY
        c.name;
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
