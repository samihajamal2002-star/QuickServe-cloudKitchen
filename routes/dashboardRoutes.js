const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const { getDashboardStats } = require("../controllers/dashboardController");

// GET /api/dashboard
router.get("/", auth, admin, getDashboardStats);

module.exports = router;