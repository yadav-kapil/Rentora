const Home = require("../models/homes.model");
const Review = require("../models/reviews.model");
const Booking = require("../models/booking.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

const postReview = wrapAsync(async (req, res) => {
  const userBooking = await Booking.findOne({
    user: req.user._id,
    home: req.params.id,
  });

  if (!userBooking) {
    throw new ExpressError(403, "Only Booked user can add review");
  }

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  const home = await Home.findById(req.params.id);

  if (!home) {
    throw new ExpressError(404, "Home not found");
  }
  await newReview.save();
  home.reviews.push(newReview._id);
  await home.save();

  return res.status(201).json({ message: "Successfully Saved Review" });
});

const deleteReview = wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  const home = await Home.findById(id);
  if (!home) {
    throw new ExpressError(404, "Home not found");
  }
  await Home.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    throw new ExpressError(404, "Review not found");
  }
  res.status(200).json({
    success: true,
    message: "Successfully Deleted Review",
  });
});

module.exports = { postReview, deleteReview };
