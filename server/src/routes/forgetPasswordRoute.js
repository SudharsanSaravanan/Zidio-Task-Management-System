// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const User = require("../models/User"); // Adjust based on your folder structure
// const router = express.Router();
// require("dotenv").config();
// const { forgotPassword } = require("../controller/forgotPasswordController");
// const SECRET_KEY = process.env.JWT_SECRET;
// // Nodemailer setup (use real email credentials)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // 📌 Forgot Password Route
// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return res.status(404).json({ message: "User not found." });

//   // Generate Reset Token (valid for 15 min)
//   const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "15m" });

//   // Send Reset Email
//   const resetLink = `http://localhost:5173/reset-password?token=${token}`;
//   await transporter.sendMail({
//     from: "your-email@gmail.com",
//     to: user.email,
//     subject: "Reset Your Password",
//     text: `Click the link to reset your password: ${resetLink}`,
//   });

//   res.json({ message: "Password reset link sent to your email." });
// });

// // 📌 Reset Password Route
// router.post("/reset-password", async (req, res) => {
//   const { token, password } = req.body;

//   try {
//     // Verify Token
//     const decoded = jwt.verify(token, SECRET_KEY);
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) return res.status(404).json({ message: "User not found." });

//     // Hash New Password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ message: "Password reset successful!" });
//   } catch (error) {
//     res.status(400).json({ message: "Invalid or expired token." });
//   }
// });

// module.exports = router;

const express = require("express");
const { forgotPassword, resetPassword } = require("../controller/forgotPasswordController");
const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
