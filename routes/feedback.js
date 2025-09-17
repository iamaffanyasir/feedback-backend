const express = require("express");
const router = express.Router();
const db = require("../config/database");

// POST /api/feedback - Create new feedback
router.post("/feedback", async (req, res) => {
  try {
    const { name, email, feedback, colorTheme } = req.body;

    // Validation
    if (!name || !email || !feedback) {
      return res.status(400).json({
        error: "Name, email, and feedback are required",
      });
    }

    // Insert into database
    const [result] = await db
      .promise()
      .execute(
        "INSERT INTO feedbacks (name, email, feedback, color_theme) VALUES (?, ?, ?, ?)",
        [name, email, feedback, colorTheme || "blue"]
      );

    res.status(201).json({
      id: result.insertId,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({
      error: "Failed to save feedback",
    });
  }
});

// GET /api/feedback - Get latest feedbacks for wall display
router.get("/feedback", async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM feedbacks ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({
      error: "Failed to fetch feedbacks",
    });
  }
});

// GET /api/feedback/all - Get all feedbacks for dashboard
router.get("/feedback/all", async (req, res) => {
  try {
    const feedbacks = await Feedback.getAll();

    // Map color_theme to colorTheme for frontend compatibility
    const mappedFeedbacks = feedbacks.map((fb) => ({
      ...fb,
      colorTheme: fb.color_theme,
    }));

    res.json({
      success: true,
      data: mappedFeedbacks,
      count: mappedFeedbacks.length,
    });
  } catch (error) {
    console.error("Error fetching all feedbacks:", error);
    res.status(500).json({
      error: "Failed to fetch all feedbacks",
    });
  }
});

// GET /api/feedback/:id - Get specific feedback
router.get("/feedback/:id", async (req, res) => {
  try {
    const feedback = await Feedback.getById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        error: "Feedback not found",
      });
    }

    // Map color_theme to colorTheme for frontend compatibility
    const mappedFeedback = {
      ...feedback,
      colorTheme: feedback.color_theme,
    };

    res.json({
      success: true,
      data: mappedFeedback,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      error: "Failed to fetch feedback",
    });
  }
});

// Add a test endpoint
router.get("/test", (req, res) => {
  res.json({ status: "ok", message: "API is working" });
});

// Add a database test endpoint
router.get("/dbtest", async (req, res) => {
  try {
    // Simple query to test database connection
    const [result] = await db.promise().query("SELECT 1 as test");
    res.json({
      status: "ok",
      message: "Database connection successful",
      data: result,
    });
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

module.exports = router;
