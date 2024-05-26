import express from "express";

const router = express.Router();
import User from "../models/User.js";

// Register a new user
router.post("/register", async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  try {
    // Check if email or phone number is already registered
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or phone number already registered" });
    }

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login with email or phone number and password
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Find user by email or phone number
    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    // If user not found or password doesn't match, return error
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ error: "Invalid email/phone number or password" });
    }

    res.json({ message: "Login successful", userid: user.id });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
