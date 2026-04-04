const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewsSchema);

module.exports = Review;