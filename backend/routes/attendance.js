import express from 'express';
import Attendance from '../models/Attendance.js';
import User from '../models/User.js';

const router = express.Router();

// Mark attendance
router.post('/', async (req, res) => {
  try {
    const { userId, status } = req.body;
    const pointsEarned = status === 'present' ? 10 : status === 'late' ? 5 : 0;
    
    const attendance = await Attendance.create({ 
      user: userId, 
      status, 
      pointsEarned 
    });
    
    // Update user points
    await User.findByIdAndUpdate(userId, { $inc: { points: pointsEarned } });
    
    res.status(201).json({ success: true, attendance });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get attendance history
router.get('/user/:userId', async (req, res) => {
  try {
    const attendance = await Attendance.find({ user: req.params.userId }).sort({ date: -1 });
    res.json({ success: true, attendance });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;