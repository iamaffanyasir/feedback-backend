const express = require("express");
const router = express.Router();
const db = require("../config/database");
const authMiddleware = require("../middleware/auth");

// Apply auth middleware to all admin routes
router.use(authMiddleware);

// Get all feedbacks with pagination
router.get("/feedbacks", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM feedbacks ORDER BY created_at DESC LIMIT ? OFFSET ?",
        [limit, offset]
      );

    const [countResult] = await db
      .promise()
      .query("SELECT COUNT(*) as total FROM feedbacks");
    const total = countResult[0].total;

    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
});

// Get a single feedback by ID
router.get("/feedbacks/:id", async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM feedbacks WHERE id = ?", [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// Update a feedback
router.put("/feedbacks/:id", async (req, res) => {
  try {
    const { name, email, feedback, colorTheme } = req.body;

    // Validate input
    if (!name || !email || !feedback) {
      return res
        .status(400)
        .json({ error: "Name, email and feedback are required" });
    }

    await db
      .promise()
      .execute(
        "UPDATE feedbacks SET name = ?, email = ?, feedback = ?, color_theme = ? WHERE id = ?",
        [name, email, feedback, colorTheme || "blue", req.params.id]
      );

    res.json({ message: "Feedback updated successfully" });
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ error: "Failed to update feedback" });
  }
});

// Delete a feedback
router.delete("/feedbacks/:id", async (req, res) => {
  try {
    await db
      .promise()
      .execute("DELETE FROM feedbacks WHERE id = ?", [req.params.id]);

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Failed to delete feedback" });
  }
});

module.exports = router;
