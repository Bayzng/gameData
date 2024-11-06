const express = require('express');
const router = express.Router();
const Game = require('../models/Game'); 

// Fetch all games and populate user details
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().populate('owner', 'username image'); 
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
