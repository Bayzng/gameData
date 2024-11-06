// const mongoose = require('mongoose');

// const gameSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   image: String,
//   appleStoreLink: String,
//   playStoreLink: String,
//   gameVideoAds: String, 
//   additionalGameOne: String, 
//   additionalGameTwo: String, 
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });

// module.exports = mongoose.model('Game', gameSchema);


const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  appleStoreLink: String,
  playStoreLink: String,
  gameVideoAds: String, 
  additionalGameOne: String, 
  additionalGameTwo: String, 
  publishDate: { type: Date, default: Date.now }, // Add this line
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Game', gameSchema);
