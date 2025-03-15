// routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Adjust path based on your structure

// Get all users (No authentication required)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field for security
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;