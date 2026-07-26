const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

const requireAuth = wrapAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ExpressError(401, "Unauthorized");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ExpressError(401, "Invalid Token");
  }
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ExpressError(401, "User not found");
  }

  req.user = user;
  next();
});


module.exports = requireAuth;