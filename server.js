const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');
const db = require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002", "http://localhost:3003"],
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://192.168.1.9:3000',
    'http://192.168.1.9:3002'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', feedbackRoutes);

// Track recent feedback to prevent duplicates
const recentFeedbacks = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Listen for new feedback from tablet-app
  socket.on('newFeedback', (feedbackData) => {
    console.log('New feedback received:', feedbackData);
    
    // Create a unique key based on feedback data
    const feedbackKey = `${feedbackData.name}-${feedbackData.email}-${feedbackData.feedback}`;
    
    // Check if we've seen this exact feedback recently
    if (!recentFeedbacks.has(feedbackKey)) {
      // Store this feedback with timestamp
      recentFeedbacks.set(feedbackKey, Date.now());
      
      // Broadcast to all wall-displays (except sender)
      // Ensure colorTheme property is present for frontend
      socket.broadcast.emit('feedbackSaved', {
        ...feedbackData,
        colorTheme: feedbackData.colorTheme || feedbackData.color_theme || 'blue'
      });
      
      // Clean up old entries from the Map every 10 minutes
      const FIVE_MINUTES = 5 * 60 * 1000;
      if (recentFeedbacks.size > 100) {
        const now = Date.now();
        for (const [key, timestamp] of recentFeedbacks.entries()) {
          if (now - timestamp > FIVE_MINUTES) {
            recentFeedbacks.delete(key);
          }
        }
      }
    } else {
      console.log('Duplicate feedback prevented:', feedbackKey);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Test database connection on startup
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');
    connection.release();
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };
