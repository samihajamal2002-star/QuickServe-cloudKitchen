// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Food Add করার Route
router.post('/add', async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        await newItem.save();
        res.status(201).json({ message: "Food added successfully!", newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;