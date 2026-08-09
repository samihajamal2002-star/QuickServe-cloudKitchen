const Order = require("../models/Order");
const User = require("../models/User");
const Menu = require("../models/Menu");

// =======================
// Create Order
// =======================
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    const io = req.app.get("io");
    if (io) {
      io.emit("new-order", savedOrder);
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: err.message || "Failed to create order" });
  }
};

// =======================
// Get All Orders (Admin)
// =======================
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email phone")
      .populate("user", "name email phone")
      .populate("items.food", "name title price image")
      .sort({ createdAt: -1 });

    res.status(200).json(orders || []);
  } catch (err) {
    console.error("Error in getOrders:", err);
    res.status(500).json({ message: err.message || "Failed to fetch orders" });
  }
};

// =======================
// Get Kitchen / Chef Orders
// =======================
exports.getChefOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Preparing", "Cooking"] },
    })
      .populate("customer", "name email phone")
      .populate("user", "name email phone")
      .populate("items.food", "name title price image")
      .sort({ createdAt: -1 });

    res.status(200).json(orders || []);
  } catch (err) {
    console.error("Error in getChefOrders:", err);
    res.status(500).json({ message: err.message || "Failed to fetch chef orders" });
  }
};

// =======================
// Get Single Order
// =======================
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("user", "name email phone")
      .populate("items.food", "name title price image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Error in getOrder:", err);
    res.status(500).json({ message: err.message || "Failed to fetch order" });
  }
};

// =======================
// Update Order Status
// =======================
exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const io = req.app.get("io");
    if (io) {
      io.emit("status-update", order);
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("Error in updateStatus:", err);
    res.status(500).json({ message: err.message || "Failed to update status" });
  }
};

// =======================
// Delete Order
// =======================
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (err) {
    console.error("Error in deleteOrder:", err);
    res.status(500).json({ message: err.message || "Failed to delete order" });
  }
};

// =======================
// Get Rider Orders
// =======================
exports.getRiderOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["Ready", "Out For Delivery", "Delivered"] },
    })
      .populate("customer", "name email phone")
      .populate("user", "name email phone")
      .populate("items.food", "name title price image")
      .sort({ updatedAt: -1 });

    res.status(200).json(orders || []);
  } catch (err) {
    console.error("Error in getRiderOrders:", err);
    res.status(500).json({ message: err.message || "Failed to fetch rider orders" });
  }
};