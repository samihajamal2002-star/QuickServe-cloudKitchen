const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
    createOrder,
    getOrders,
    getOrder,
    updateStatus,
    deleteOrder
} = require("../controllers/orderController");

// Customer
router.post("/", createOrder);

// Admin
router.get("/", auth, admin, getOrders);

router.get("/:id", auth, admin, getOrder);

router.put("/:id", auth, admin, updateStatus);

router.delete("/:id", auth, admin, deleteOrder);

module.exports = router;