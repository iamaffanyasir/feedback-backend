const mysql = require("mysql2");
require("dotenv").config();

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

// Create database and tables
const initializeDatabase = async () => {
  try {
    // Create a separate connection to handle database creation
    const initConnection = mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    });

    // Create the database if it doesn't exist
    await initConnection.promise().execute(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "feedback_system"}`
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

    // Create indexes
    const createIndex1 = `CREATE INDEX IF NOT EXISTS idx_created_at ON feedbacks(created_at)`;
    const createIndex2 = `CREATE INDEX IF NOT EXISTS idx_color_theme ON feedbacks(color_theme)`;

    try {
      await pool.promise().execute(createIndex1);
      await pool.promise().execute(createIndex2);
    } catch (indexErr) {
      // Ignore duplicate key errors
      if (indexErr.code !== "ER_DUP_KEYNAME") {
        console.error("Error creating indexes:", indexErr);
      }
    }
  } catch (err) {
    console.error("Database initialization error:", err);
  }
};

// Initialize the database
initializeDatabase();

module.exports = pool;
  }
});

module.exports = pool;
