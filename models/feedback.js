const db = require('../config/database');

class Feedback {
  static create(feedbackData) {
    return new Promise((resolve, reject) => {
      const { name, email, feedback, colorTheme } = feedbackData;
      const query = 'INSERT INTO feedbacks (name, email, feedback, color_theme) VALUES (?, ?, ?, ?)';
      
      db.execute(query, [name, email, feedback, colorTheme || 'blue'], (err, results) => {
        if (err) {
          reject(err);
        } else {
          // Return both colorTheme and color_theme for frontend compatibility
          resolve({ id: results.insertId, ...feedbackData, color_theme: colorTheme || 'blue' });
        }
      });
    });
  }

  static getLatest(limit = 30) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM feedbacks ORDER BY created_at DESC LIMIT ?';
      
      db.execute(query, [limit], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM feedbacks ORDER BY created_at DESC';
      
      db.execute(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM feedbacks WHERE id = ?';
      
      db.execute(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
}

module.exports = Feedback;
