// routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); 


router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;