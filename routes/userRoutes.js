const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get user data (protected)
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      username: user.username,
      email: user.email,
      image: user.image // Include image field
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to handle image upload (protected)
router.post('/upload', authMiddleware, async (req, res) => {
  console.log('Received request at /upload');
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'No image provided.' });
  }

  try {
    const userId = req.user.id; 
    // Update the user's profile image in the database
    const user = await User.findByIdAndUpdate(userId, { image }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ imageUrl: user.image });
  } catch (error) {
    console.error('Error updating user image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
