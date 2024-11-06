const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// GET /api/reviews/:id - Get a specific review by its ID
router.get('/api/getReview/:id', async (req, res) => {
    const reviewId = req.params.id;  // This is the review ID

    try {
        // Fetch the review by its ID
        const review = await Review.findById(reviewId).populate('user', 'username', 'image');

        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        res.status(200).json({ review });
    } catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ message: 'Server error while fetching the review.' });
    }
});

module.exports = router;
