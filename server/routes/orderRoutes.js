const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createOrder,
  getOrders,
  getChefOrders,
  getOrder,
  getRiderOrders,
  updateStatus,
  deleteOrder,
} = require("../controllers/orderController");

// Customer Route
router.post("/", createOrder);

// Chef Route (Get Kitchen Orders)
router.get("/chef", auth, getChefOrders);

// Rider Route
router.get("/rider", auth, getRiderOrders);

// Admin Routes
router.get("/", auth, admin, getOrders);
router.get("/:id", auth, admin, getOrder);
router.put("/:id", auth, updateStatus); // Auth allows Chef/Rider/Admin to update status
router.delete("/:id", auth, admin, deleteOrder);

module.exports = router;