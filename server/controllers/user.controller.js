const User = require("../models/user.model");

const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// GET ME
const getMe = wrapAsync(async (req, res) => {
  const user = req.user.toObject();
  user.id = user._id;
  return res.status(200).json({
    success: true,
    message: "Token Verified",
    user,
  });
});

// Login
const postLogin = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ExpressError(401, "Invalid email or password");
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new ExpressError(401, "Invalid email or password");
  }

  const token = createToken(user._id);
  const userResponse = user.toObject();
  delete userResponse.password;
  userResponse.id = userResponse._id;

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: "Login Successfully",
      user: userResponse,
    });
});

// Signup
const postSignUp = wrapAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const isUser = await User.findOne({ email: email.toLowerCase() });
  if (isUser) {
    throw new ExpressError(409, "User Already Exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: hashPassword,
    role: role || "User",
  });
  await newUser.save();
  const token = createToken(newUser._id);
  const userResponse = newUser.toObject();
  delete userResponse.password;
  userResponse.id = userResponse._id;

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1d
    })
    .json({
      success: true,
      message: "User Added Successfully",
      user: userResponse,
    });
});

// LOGOUT
const postLogout = wrapAsync(async (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
    })
    .status(200)
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

// UPDATE PROFILE (Name, Phone, Address, Bio, Avatar / DP - keeps Email read-only)
const updateProfile = wrapAsync(async (req, res) => {
  const { name, phone, address, bio, dp } = req.body;
  
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;
  if (bio !== undefined) user.bio = bio;

  // Handle uploaded file from Multer / Cloudinary
  if (req.file && (req.file.path || req.file.secure_url)) {
    user.dp = req.file.path || req.file.secure_url;
  } else if (dp !== undefined) {
    user.dp = dp;
  }

  await user.save();

  const userResponse = user.toObject();
  delete userResponse.password;
  userResponse.id = userResponse._id;

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: userResponse,
  });
});

// CHANGE PASSWORD (verifying oldPassword)
const changePassword = wrapAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ExpressError(400, "Old password and new password are required");
  }

  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    throw new ExpressError(400, "Incorrect current password");
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

exports.postLogin = postLogin;
exports.postSignUp = postSignUp;
exports.postLogout = postLogout;
exports.getMe = getMe;
exports.updateProfile = updateProfile;
exports.changePassword = changePassword;
