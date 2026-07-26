const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.post("/", requireAuth, bookingController.createBooking);
router.get("/", requireAuth, bookingController.getUserBookings);
router.get("/host", requireAuth, bookingController.getHostBookings);
router.get("/home/:id", requireAuth, bookingController.getHomeBookings);
router.patch("/:id/status", requireAuth, bookingController.updateBookingStatus);

module.exports = router;
