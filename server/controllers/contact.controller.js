const Contact = require("../models/contact.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

const submitContactForm = wrapAsync(async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  
  if (!firstName || !lastName || !email || !message) {
    throw new ExpressError(400, "All fields are required");
  }

  const newContact = new Contact({
    firstName,
    lastName,
    email,
    message
  });

  await newContact.save();

  return res.status(201).json({ message: "Message sent successfully" });
});

module.exports = { submitContactForm };
