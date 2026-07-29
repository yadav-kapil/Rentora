const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controller");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, wishlistController.getWishlist);
router.get("/ids", requireAuth, wishlistController.getWishlistIds);
router.post("/toggle", requireAuth, wishlistController.toggleWishlist);

module.exports = router;
