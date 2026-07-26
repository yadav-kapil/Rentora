const Home = require("../models/homes.model");
const Review = require("../models/reviews.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

const Booking = require("../models/booking.model");

const getHomes = wrapAsync(async (req, res) => {
  const homesList = await Home.find({});
  return res.status(200).json(homesList);
});

const getMyHomes = wrapAsync(async (req, res) => {
  const homesList = await Home.find({ host: req.user._id });
  return res.status(200).json(homesList);
});

const getHome = wrapAsync(async (req, res) => {
  const id = req.params.id;
  const home = await Home.findById(id)
    .populate({
      path: "host",
      select: "name email dp",
    })
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "name email",
      },
    });
  if (!home) {
    throw new ExpressError(404, "Home Not Found");
  }
  return res.status(200).json(home);
});

const postHome = wrapAsync(async (req, res) => {
  const newHome = new Home(req.body.home);
  if (req.user && req.user._id) {
    newHome.host = req.user._id;
  }
  await newHome.save();
  return res.status(201).json({ message: "Successfully Saved Home" });
});

const updateHome = wrapAsync(async (req, res) => {
  const updated = await Home.findByIdAndUpdate(req.params.id, req.body.home, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!updated) {
    throw new ExpressError(404, "Home Not Found");
  }
  return res.status(200).json(updated);
});

const deleteHome = wrapAsync(async (req, res) => {
  const home = await Home.findById(req.params.id);
  if (!home) {
    throw new ExpressError(404, "Home Not Found");
  }
  await Review.deleteMany({ _id: { $in: home.reviews } });
  await Home.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Successfully Deleted Home" });
});

module.exports = { getHome, getHomes, getMyHomes, postHome, updateHome, deleteHome };
