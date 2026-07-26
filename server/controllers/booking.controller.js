const Booking = require("../models/booking.model");
const Home = require("../models/homes.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

// Create Booking
const createBooking = wrapAsync(async (req, res) => {
  const { homeId, checkIn, checkOut, paymentMethod } = req.body;
  const userId = req.user._id;

  const home = await Home.findById(homeId);
  if (!home) throw new ExpressError(404, "Home not found");

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  
  if (start >= end) throw new ExpressError(400, "Check-out date must be after check-in date");

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const totalPrice = home.price * days;

  const booking = new Booking({
    user: userId,
    home: homeId,
    checkIn: start,
    checkOut: end,
    totalPrice,
    status: "pending",
    paymentMethod: paymentMethod || "Cash",
  });

  await booking.save();

  res.status(201).json({ success: true, booking });
});

// Get User Bookings
const getUserBookings = wrapAsync(async (req, res) => {
  const userId = req.user._id;
  const bookings = await Booking.find({ user: userId }).populate("home").sort({ createdAt: -1 });
  res.status(200).json(bookings);
});

// Get Bookings by Home ID
const getHomeBookings = wrapAsync(async (req, res) => {
  const homeId = req.params.id;
  const bookings = await Booking.find({ home: homeId }).populate("user", "name email").sort({ createdAt: -1 });
  res.status(200).json(bookings);
});

// Get Host Bookings (Bookings for homes created by this host)
const getHostBookings = wrapAsync(async (req, res) => {
  const hostId = req.user._id;
  const hostHomes = await Home.find({ host: hostId }).select("_id");
  const homeIds = hostHomes.map((h) => h._id);

  const bookings = await Booking.find({ home: { $in: homeIds } })
    .populate("home")
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json(bookings);
});

// Update Booking Status
const updateBookingStatus = wrapAsync(async (req, res) => {
  const { status } = req.body;
  if (!["pending", "confirmed", "rejected", "cancelled"].includes(status)) {
    throw new ExpressError(400, "Invalid status");
  }

  const existingBooking = await Booking.findById(req.params.id);
  if (!existingBooking) throw new ExpressError(404, "Booking not found");

  if ((existingBooking.status === "cancelled" || existingBooking.status === "rejected") && status === "confirmed") {
    throw new ExpressError(400, "A cancelled or rejected booking cannot be confirmed.");
  }

  existingBooking.status = status;
  await existingBooking.save();
  await existingBooking.populate("home user");
  res.status(200).json(existingBooking);
});

module.exports = { createBooking, getUserBookings, getHomeBookings, getHostBookings, updateBookingStatus };
