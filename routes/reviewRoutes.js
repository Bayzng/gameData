const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Game = require('../models/Game');
const authMiddleware = require('../middleware/authMiddleware');

// POST route for creating a review
router.post('/:id', authMiddleware, async (req, res) => {
  const { rating, message } = req.body;
  const gameId = req.params.id; 

  try {
    if (!rating || !message) {
      return res.status(400).json({ message: 'Rating and message are required' });
    }

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const review = new Review({
      rating,
      message,
      owner: req.user._id, 
      game: gameId
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
});

// GET route for retrieving reviews for a specific game
router.get('/:id/reviews', async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const reviews = await Review.find({ game: gameId }).populate('owner', 'username');
    
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const Review = require('../models/Review');
// const Game = require('../models/Game');
// const authMiddleware = require('../middleware/authMiddleware');

// router.post('/:id', authMiddleware, async (req, res) => {
//   const { rating, message } = req.body;
//   const gameId = req.params.id; 

//   try {
//     if (!rating || !message) {
//       return res.status(400).json({ message: 'Rating and message are required' });
//     }

//     const game = await Game.findById(gameId);
//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     const review = new Review({
//       rating,
//       message,
//       owner: req.user._id, 
//       game: gameId
//     });

//     await review.save();

//     res.status(201).json(review);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating review', error: error.message });
//   }
// });

// module.exports = router;
