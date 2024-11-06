const Game = require('../models/Game');

exports.getGames = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const games = await Game.find({ owner: userId }); // Ensure Game model has an 'owner' field
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error.message);
    res.status(500).json({ message: 'Error fetching games' });
  }
};

exports.addGame = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from auth middleware
    const gameData = { ...req.body, owner: userId }; // Add the owner field
    const newGame = new Game(gameData);
    await newGame.save();
    res.json(newGame);
  } catch (error) {
    console.error('Error adding game:', error.message);
    res.status(500).json({ message: 'Error adding game' });
  }
};
