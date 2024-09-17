// This file sets up an Express server that connects to a PostgreSQL database,
// handles image uploads, and forwards the images to a remote service for processing.
// It also includes a test route to check the PostgreSQL connection.

const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Load environment variables from a .env file located at the specified path
dotenv.config({ path: '../BDD/quick_setup/.env' });

const app = express();
const port = 3000;
const IPvillagebyca = '10.10.1.126';
const IPmyHome = '192.168.1.12';
// add your IP adress here

// Configure PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Configure multer for file upload handling, storing files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Test PostgreSQL connection by trying to connect to the database
app.get('/api/test-connection', async (req, res) => {
  try {
    const client = await pool.connect();
    res.send('Successfully connected to PostgreSQL');
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
    res.status(500).send('Error connecting to PostgreSQL');
  }
});

// Endpoint to upload an image and forward it to the remote service for processing
app.post('/send-img', upload.single('file'), async (req, res) => {
  try {
    const f = new FormData();
    f.append('file', req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });

    // Forward the image to a remote server for processing (change IP adress constant here)
    const response = await fetch(`http://${IPvillagebyca}:8000/process-image/`, {
      method: 'POST',
      body: f,
    });

    res.status(200).json(await response.json());
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ "error": "An error occurred" });
  }
});

// Handle unmatched routes with a 404 error
app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
