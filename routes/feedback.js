const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// POST /api/feedback - Create new feedback
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, feedback, colorTheme } = req.body;

    // Validation
    if (!name || !email || !feedback) {
      return res.status(400).json({ 
        error: 'Name, email, and feedback are required' 
      });
    }

    const newFeedback = await Feedback.create({
      name,
      email,
      feedback,
      colorTheme: colorTheme || 'blue'
    });

    res.status(201).json({
      success: true,
      data: newFeedback,
      message: 'Feedback saved successfully'
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ 
      error: 'Failed to save feedback' 
    });
  }
});

// GET /api/feedback - Get latest feedbacks for wall display
router.get('/feedback', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const feedbacks = await Feedback.getLatest(limit);

    // Map color_theme to colorTheme for frontend compatibility
    const mappedFeedbacks = feedbacks.map(fb => ({
      ...fb,
      colorTheme: fb.color_theme,
    }));

    res.json({
      success: true,
      data: mappedFeedbacks,
      count: mappedFeedbacks.length
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ 
      error: 'Failed to fetch feedbacks' 
    });
  }
});

// GET /api/feedback/all - Get all feedbacks for dashboard
router.get('/feedback/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.getAll();

    // Map color_theme to colorTheme for frontend compatibility
    const mappedFeedbacks = feedbacks.map(fb => ({
      ...fb,
      colorTheme: fb.color_theme,
    }));

    res.json({
      success: true,
      data: mappedFeedbacks,
      count: mappedFeedbacks.length
    });
  } catch (error) {
    console.error('Error fetching all feedbacks:', error);
    res.status(500).json({ 
      error: 'Failed to fetch all feedbacks' 
    });
  }
});

// GET /api/feedback/:id - Get specific feedback
router.get('/feedback/:id', async (req, res) => {
  try {
    const feedback = await Feedback.getById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ 
        error: 'Feedback not found' 
      });
    }

    // Map color_theme to colorTheme for frontend compatibility
    const mappedFeedback = {
      ...feedback,
      colorTheme: feedback.color_theme,
    };

    res.json({
      success: true,
      data: mappedFeedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ 
      error: 'Failed to fetch feedback' 
    });
  }
});

module.exports = router;
