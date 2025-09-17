const basicAuth = require("express-basic-auth");

// Simple Basic Auth middleware
const authMiddleware = basicAuth({
  users: {
    admin: "FeedbackAdmin123", // Change this to a secure password
  },
  challenge: true,
  realm: "Feedback System Admin",
});

module.exports = authMiddleware;
