// Import required modules reference: https://hackernoon.com/build-a-simple-html-website-with-postgres-database-connectivity
const dotenv = require('dotenv');
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");

// Respond to OPTIONS method
export const onRequestOptions = async () => {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Max-Age': '86400',
      },
    });
  };
  
  // Set CORS to all /api responses
  export const onRequest = async (context) => {
    const response = await context.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Max-Age', '86400');
    return response;
  };

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

try {
    const result = await pool.query("SELECT * FROM clients;");
//    const response = await context.next();
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Max-Age', '86400');
//    return response;
    res.json(result.rows);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("An error occurred while retrieving data from the database.");
  };
