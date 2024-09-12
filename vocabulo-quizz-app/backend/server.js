const express = require('express');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config({ path: '../../BDD/quick_setup/.env' });

const app = express();
const port = 3000;

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Importer les routes
const routes = require('./routes/routes');

// Utiliser les routes importées
app.use(routes);

app.get('/api/test-db-connection', async (req, res) => {
  try {
    const client = await pool.connect();
    res.send('Connexion réussie à PostgreSQL');
    client.release();
  } catch (err) {
    console.error('Erreur lors de la connexion à PostgreSQL:', err.message);
    res.status(500).send('Erreur lors de la connexion à PostgreSQL');
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
