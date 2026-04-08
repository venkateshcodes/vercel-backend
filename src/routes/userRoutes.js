const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user dashboard data
router.get('/dashboard', protect, async (req, res) => {
  try {
    const Registration = require('../models/Registration');
    const Submission = require('../models/Submission');
    
    const registration = await Registration.findOne({ userId: req.user.id });
    const submissions = await Submission.find({ userId: req.user.id });
    
    res.json({
      success: true,
      data: {
        user: req.user,
        registration,
        submissions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;