const mysql = require("mysql2");
require("dotenv").config();

// First connection without database to create it
const createDbConnection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "", // Add password parameter
  // No database specified
});

// Create database if it doesn't exist
createDbConnection.execute(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "feedback_system"}`,
  (err) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log("Database created or already exists");
    }
    createDbConnection.end();
  }
);

// Main connection pool with database
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "", // Add password parameter
  database: process.env.DB_NAME || "feedback_system",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create tables and indexes separately
const createTable = `
CREATE TABLE IF NOT EXISTS feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    feedback TEXT NOT NULL,
    color_theme VARCHAR(50) DEFAULT 'blue',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const createIndex1 = `CREATE INDEX IF NOT EXISTS idx_created_at ON feedbacks(created_at)`;
const createIndex2 = `CREATE INDEX IF NOT EXISTS idx_color_theme ON feedbacks(color_theme)`;

// Execute table creation
pool.execute(createTable, (err) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Table created successfully");

    // Create indexes after table is created
    pool.execute(createIndex1, (err) => {
      if (err && err.code !== "ER_DUP_KEYNAME") {
        console.error("Error creating index 1:", err);
      }
    });

    pool.execute(createIndex2, (err) => {
      if (err && err.code !== "ER_DUP_KEYNAME") {
        console.error("Error creating index 2:", err);
      }
    });
  }
});

module.exports = pool;
