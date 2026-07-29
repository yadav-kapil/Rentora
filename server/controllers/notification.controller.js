const Notification = require("../models/notification.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

// GET ALL NOTIFICATIONS
const getNotifications = wrapAsync(async (req, res) => {
  let notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });

  // Seed initial notification data if user has none
  if (notifications.length === 0) {
    const defaultNotifications = [
      {
        recipient: req.user._id,
        title: "Welcome to Rentora! 👋",
        message: "Explore modern homes, villas, cabins, and farmhouse properties matching your tastes.",
        type: "System",
      },
      {
        recipient: req.user._id,
        title: "Verify your Profile 📝",
        message: "Complete your host or guest profile details and set up an avatar image to begin.",
        type: "System",
      }
    ];
    await Notification.insertMany(defaultNotifications);
    notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
  }

  return res.status(200).json({ success: true, notifications });
});

// MARK NOTIFICATION AS READ
const markAsRead = wrapAsync(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new ExpressError(404, "Notification not found");
  }

  return res.status(200).json({ success: true, message: "Marked as read", notification });
});

// MARK ALL NOTIFICATIONS AS READ
const markAllAsRead = wrapAsync(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, isRead: false },
    { isRead: true }
  );

  return res.status(200).json({ success: true, message: "All notifications marked as read" });
});

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
