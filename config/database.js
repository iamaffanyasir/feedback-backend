const mysql = require("mysql2");
require("dotenv").config();

// Main connection pool with database
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1", // Use IPv4 instead of IPv6
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "", // Add password parameter
  database: process.env.DB_NAME || "feedback_system",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create database and tables
const initializeDatabase = async () => {
  try {
    // Create a separate connection to handle database creation
    const initConnection = mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1", // Use IPv4 instead of IPv6
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    });

    // Create the database if it doesn't exist
    await initConnection
      .promise()
      .execute(
        `CREATE DATABASE IF NOT EXISTS ${
          process.env.DB_NAME || "feedback_system"
        }`
      );

    console.log("Database created or already exists");
    initConnection.end();

    // Now use the pool to create tables
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

    await pool.promise().execute(createTable);
    console.log("Table created successfully");

    // Create indexes with correct syntax
    // MySQL doesn't support IF NOT EXISTS for indexes, so we need to check if they exist first
    try {
      // Try to create the first index
      const createIndex1 = `CREATE INDEX idx_created_at ON feedbacks(created_at)`;
      await pool.promise().execute(createIndex1);
      console.log("Index 1 created successfully");
    } catch (indexErr1) {
      // Ignore duplicate key errors (1061 = duplicate key name)
      if (indexErr1.errno === 1061) {
        console.log("Index 1 already exists");
      } else {
        console.error("Error creating index 1:", indexErr1);
      }
    }

    try {
      // Try to create the second index
      const createIndex2 = `CREATE INDEX idx_color_theme ON feedbacks(color_theme)`;
      await pool.promise().execute(createIndex2);
      console.log("Index 2 created successfully");
    } catch (indexErr2) {
      // Ignore duplicate key errors
      if (indexErr2.errno === 1061) {
        console.log("Index 2 already exists");
      } else {
        console.error("Error creating index 2:", indexErr2);
      }
    }
  } catch (err) {
    console.error("Database initialization error:", err);
  }
};

// Initialize the database
initializeDatabase();

module.exports = pool;
