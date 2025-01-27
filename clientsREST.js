// Import required modules reference: https://hackernoon.com/build-a-simple-html-website-with-postgres-database-connectivity
const dotenv = require('dotenv');
const express = require("express");
const https = require('https');
const cors = require("cors");
const fs = require('fs');
const { Pool } = require("pg");
const path = require("path");
const privateKey = fs.readFileSync(path.resolve(__dirname, 'certificat/server.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, 'certificat/server.crt'), 'utf8');

// Connect and Create an Express Application
const app = express();
const port = 3000; // By default, its 3000, you can customize

// Create a Postgres Connection
dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: true,
});

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Use express.json() instead of bodyParser

// CORS is enabled for all origins
app.use(cors());

// Setup Route handler
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "", "index.html"));
});

// Route handler for GET clients data
app.get("/clients", cors(), async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients;");
    res.json(result.rows);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("An error occurred while retrieving data from the database.");
  }
});

// Listen to https port
const httpsServer = https.createServer({
  key: privateKey,
  cert: certificate,
}, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
