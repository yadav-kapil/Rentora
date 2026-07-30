// Modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ExpressError = require("./utils/ExpressError");

const app = express();

//Router Modules
const homeRouter = require("./routes/home.routes.js");
const reviewRouter = require("./routes/review.routes.js");
const userRouter = require('./routes/user.routes.js');
const bookingRouter = require('./routes/booking.routes.js');
const contactRouter = require('./routes/contact.routes.js');
const newsletterRouter = require('./routes/newsletter.routes.js');
const wishlistRouter = require('./routes/wishlist.routes.js');
const notificationRouter = require('./routes/notification.routes.js');


// MiddleWares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);


// Routes
app.use("/api/homes", homeRouter);
app.use("/api/homes/:id/reviews", reviewRouter);
app.use("/api/user" , userRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/contact", contactRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/notifications", notificationRouter);

// Error Handlers
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  console.error("ERROR : ",err.message);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  if (res.headersSent) {
    return next(err);
  }
  res.status(status).json({
    success: false,
    message,
  });
});

// Main Fn
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
