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

//LOGOUT
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

exports.postLogin = postLogin;
exports.postSignUp = postSignUp;
exports.postLogout = postLogout;
exports.getMe = getMe;
