const mysql = require("mysql2");
require("dotenv").config();

// Main connection pool with database - this is essential
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "feedback_user",
  password: process.env.DB_PASSWORD || "Feedback@123",
  database: process.env.DB_NAME || "feedback_system",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Simple test query to verify connection
pool.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
  }
});

module.exports = pool;
