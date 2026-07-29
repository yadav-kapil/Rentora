const express = require("express");
const { getNotifications, markAsRead, markAllAsRead } = require("../controllers/notification.controller");
const requireAuth = require("../middlewares/requireAuth.middleware");

const router = express.Router();

router.get("/", requireAuth, getNotifications);
router.patch("/read-all", requireAuth, markAllAsRead);
router.patch("/:id/read", requireAuth, markAsRead);

module.exports = router;
