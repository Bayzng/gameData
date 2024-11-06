const express = require("express");
const router = express.Router();
const Game = require('../models/Game'); 

// Get a game by its ID
router.get("/:id", async (req, res) => {
    try {
      const gameId = req.params.id; 
      const gameData = await Game.findById(gameId).populate('owner'); 
      if (!gameData) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.json(gameData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
  



