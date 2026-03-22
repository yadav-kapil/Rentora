// Modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const homeValidation = require("./middlewares/homeSchemaValidation.middleware.js");

// Models
const Home = require("./models/homes");

// MiddleWares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

// Routes
app.get(
  "/api/homes",
  wrapAsync(async (req, res) => {
    const homesList = await Home.find({});
    return res.status(200).json(homesList);
  }),
);

app.get(
  "/api/homes/:id",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const home = await Home.findById(id);
    if (!home) {
      throw new ExpressError(404, "Home Not Found");
    }
    return res.status(200).json(home);
  }),
);

app.post(
  "/api/homes",
  homeValidation,
  wrapAsync(async (req, res) => {
    const newHome = new Home(req.body.home);
    await newHome.save();
    return res.status(201).json({ message: "Successfully Saved Home" });
  }),
);

app.put(
  "/api/homes/:id",
  homeValidation,
  wrapAsync(async (req, res) => {
    const updated = await Home.findByIdAndUpdate(req.params.id, req.body.home, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updated) {
      throw new ExpressError(404, "Home Not Found");
    }
    return res.status(200).json(updated);
  }),
);

app.delete(
  "/api/homes/:id",
  wrapAsync(async (req, res) => {
    const deletedHome = await Home.findByIdAndDelete(req.params.id);
    if (!deletedHome) {
      throw new ExpressError(404, "Home Not Found");
    }
    res.status(200).json({ message: "Successfully Deleted Home" });
  }),
);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    message,
  });
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("***** Mongo Connected *****");
    app.listen(process.env.PORT, () => {
      console.log("------ SERVER STARTED -----");
    });
  } catch (err) {
    console.error("Something Went Wrong / ERROR : ", err);
  }
}

main();
