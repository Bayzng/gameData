const express = require('express');
const Game = require('../models/Game');
const authMiddleware = require('../middleware/authMiddleware');
const { getGames, addGame } = require('../controllers/gamesController');

const router = express.Router();



// GET endpoint to fetch games for the authenticated user
router.get('/', authMiddleware, getGames);

// POST endpoint to add a new game
router.post('/', authMiddleware, addGame);



// GET endpoint to fetch all games uploaded by the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Find games where the 'user' field matches the logged-in user's ID
    const games = await Game.find({ user: req.user._id });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const games = await Game.find(); // Fetch all games
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error.message);
    res.status(500).json({ message: 'Error fetching games' });
  }
});



// POST endpoint to add a new game
router.post('/', authMiddleware, async (req, res) => {
  const { image, title, description, appleStoreLink, playStoreLink } = req.body;

  try {
    const newGame = new Game({
      user: req.user._id, 
      image,
      title,
      description,
      appleStoreLink,
      playStoreLink
    });

    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    console.error('Error adding game:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
