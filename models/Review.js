const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the logged-in user
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true } // Optionally, you can link the review to a game
});

module.exports = mongoose.model('Review', reviewSchema);
