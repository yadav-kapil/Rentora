const Wishlist = require("../models/wishlist.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

// GET populated wishlist homes for the logged-in user
const getWishlist = wrapAsync(async (req, res) => {
  const wishlistItems = await Wishlist.find({ user: req.user._id })
    .populate("home")
    .sort({ createdAt: -1 });

  // Filter out any deleted home references
  const homes = wishlistItems
    .filter((item) => item.home !== null)
    .map((item) => item.home);

  return res.status(200).json(homes);
});

// GET wishlist home IDs array for quick frontend UI checks
const getWishlistIds = wrapAsync(async (req, res) => {
  const wishlistItems = await Wishlist.find({ user: req.user._id }).select("home");
  const wishlistIds = wishlistItems.map((item) => item.home.toString());

  return res.status(200).json({ success: true, wishlistIds });
});

// POST toggle listing in user's wishlist
const toggleWishlist = wrapAsync(async (req, res) => {
  const { homeId } = req.body;
  if (!homeId) {
    throw new ExpressError(400, "Home ID is required");
  }

  const existing = await Wishlist.findOne({ user: req.user._id, home: homeId });

  if (existing) {
    await Wishlist.findByIdAndDelete(existing._id);
    return res.status(200).json({
      success: true,
      isWishlisted: false,
      homeId,
      message: "Removed from wishlist",
    });
  } else {
    await Wishlist.create({ user: req.user._id, home: homeId });
    return res.status(201).json({
      success: true,
      isWishlisted: true,
      homeId,
      message: "Added to wishlist",
    });
  }
});

exports.getWishlist = getWishlist;
exports.getWishlistIds = getWishlistIds;
exports.toggleWishlist = toggleWishlist;
