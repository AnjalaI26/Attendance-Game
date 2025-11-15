import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard/top', async (req, res) => {
  try {
    const users = await User.find()
      .select('name points')
      .sort({ points: -1 })
      .limit(10);
    res.json({ success: true, leaderboard: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;