const express = require("express");
const router = express.Router({ mergeParams: true });

const validate = require("../middlewares/validate.middleware");
const reviewSchemaValidation = require("../validators/review.validator");
const requireAuth = require("../middlewares/requireAuth.middleware");

const {
  postReview,
  deleteReview,
} = require("../controllers/review.controller");

// Review Routes
router.post("/", requireAuth, validate(reviewSchemaValidation), postReview);

router.delete("/:reviewId", requireAuth, deleteReview);

module.exports = router;
