const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null }, // New field
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);