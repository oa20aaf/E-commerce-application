const express = require("express");
const asyncHandler = require("express-async-handler");
const ContactMessage = require("../models/Contact"); // Using require here

const contactRoute = express.Router();

// 📩 Create a Contact Message
contactRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input data
    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error("All fields are required.");
    }

    // Create a new contact message
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    const createdContactMessage = await contactMessage.save();

    res.status(201).json({
      message: "Your message has been sent successfully!",
      contactMessage: createdContactMessage,
    });
  })
);

<<<<<<< HEAD
module.exports = contactRoute;
=======
module.exports = contactRoute;
>>>>>>> 411bcb17893dbbba8021310f8ee527ed4ceaf317
