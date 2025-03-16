// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     // Create a password reset token (For simplicity, using a random number here)
//     const resetToken = Math.random().toString(36).substring(2, 15);

//     // Setup email transport
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // 🔹 Use your email from .env
//         pass: process.env.EMAIL_PASS, // 🔹 Use app password, NOT personal password
//       },
//     });

//     // Send email
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset Request",
//       text: `Use this token to reset your password: ${resetToken}`,
//     });

//     res.json({ message: "Reset link sent to email" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ message: "Error sending reset email" });
//   }
// };

// module.exports = { forgotPassword };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User"); 
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📌 **Forgot Password Controller**
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: "User not found." });

//     // Generate Reset Token (valid for 15 min)
//     const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "15m" });
//     console.log("Before update:", user);
//     // 🔹 Save token in database
//     user.resetToken = token;
//     user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
//     await user.save();

//     // Send Reset Email
//     const resetLink = `http://localhost:5173/reset-password?token=${token}`;
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Reset Your Password",
//       text: `Click the link to reset your password: ${resetLink}`,
//     });
//  console.log("After update:", await User.findOne({ email }));
//     res.json({ message: "Password reset link sent to your email." });
//   } catch (error) {
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// };

// // 📌 **Reset Password Controller**
// const resetPassword = async (req, res) => {
//   try {
//     const { token, password } = req.body;

//     const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });

//     if (!user) return res.status(400).json({ message: "Invalid or expired token." });

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;

//     // 🔹 Remove token after password reset
//     user.resetToken = null;
//     user.resetTokenExpires = null;
//     await user.save();

//     res.json({ message: "Password reset successful!" });
//   } catch (error) {
//     res.status(400).json({ message: "Invalid or expired token." });
//   }
// };
const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found." });
  
      const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "15m" });
  
      user.resetToken = token;
      user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
      await user.save();
  
      const resetLink = `http://localhost:5173/reset-password?token=${token}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Reset Your Password",
        text: `Click the link to reset your password: ${resetLink}`,
      });
  
      res.json({ message: "Password reset link sent to your email." });
    } catch (error) {
      //console.error("Forgot Password Error:", error); // 🔍 Log error
      res.status(500).json({ message: "Server error, please try again." });
    }
  };
  
  const resetPassword = async (req, res) => {
    try {
      const { token, password } = req.body;
  
      const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });
  
      if (!user) return res.status(400).json({ message: "Invalid or expired token." });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
  
      user.resetToken = null;
      user.resetTokenExpires = null;
      await user.save();
  
      res.json({ message: "Password reset successful!" });
    } catch (error) {
     // console.error("Reset Password Error:", error); // 🔍 Log error
      res.status(500).json({ message: "Server error, please try again." });
    }
  };
  
module.exports = { forgotPassword, resetPassword };
