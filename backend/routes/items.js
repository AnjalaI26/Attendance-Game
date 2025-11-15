import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ success: true, items });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Purchase item
router.post('/purchase', async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const item = await Item.findById(itemId);
    const user = await User.findById(userId);
    
    if (user.points < item.cost) {
      return res.status(400).json({ success: false, message: 'Insufficient points' });
    }
    
    user.points -= item.cost;
    user.items.push(itemId);
    await user.save();
    
    res.json({ success: true, message: 'Item purchased successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;