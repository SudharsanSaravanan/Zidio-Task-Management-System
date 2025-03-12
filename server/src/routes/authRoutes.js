// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const { protect, adminOnly } = require("../middleware/authMiddleware");

// General Authentication Middleware
// const protect = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ message: "Unauthorized access" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

// // Admin Authorization Middleware
// const adminOnly = (req, res, next) => {
//     if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
//     next();
// };

// module.exports =  {protect, adminOnly} ;
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register Route
// router.post("/register", async (req, res) => {
//     try {
//         const { email, password, role } = req.body;

//         // Check if user already exists
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: "User already exists" });

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         user = new User({ email, password: hashedPassword, role: role || "user" });
//         await user.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error", error });
//     }
// });
// Register Route
// Register Route
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({ fullName, email, password: hashedPassword, role: role || "user" });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password,role} = req.body;
       // console.log(req.body);
       // console.log("Login attempt:", { email, password,role });
        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        // Check password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
        if(role&&user.role!=role)
        {
            return res.status(403).json({message:"Unauthorized login attempt"});
        }
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
