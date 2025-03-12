const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Example: Admin-only route
router.get('/dashboard', protect, adminOnly, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

module.exports = router;
