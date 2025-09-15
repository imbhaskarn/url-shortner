const express = require('express');
const router = express.Router();

// GET /api/role - Get user role and preferences
router.get('/', async (req, res) => {
  try {
    // For now, return default values since the frontend expects this structure
    // In a real app, this would fetch from user profile/preferences
    const userData = {
      name: "merchant", // or "admin", "user", etc.
      dark_mode: false
    };

    res.json(userData);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Server error fetching role' });
  }
});

// PUT /api/role/update - Update user preferences
router.put('/update', async (req, res) => {
  try {
    const { dark_mode } = req.body;

    // For now, just return success
    // In a real app, this would update the user's preferences in the database
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ message: 'Server error updating preferences' });
  }
});

module.exports = router;