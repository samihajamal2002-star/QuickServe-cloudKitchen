const Order = require("../models/Order");

// =======================
// Create Order
// =======================
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    // Socket.io
    const io = req.app.get("io");
    io.emit("new-order", savedOrder);

    res.status(201).json(savedOrder);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// =======================
// Get All Orders
// =======================
exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// =======================
// Get Single Order
// =======================
exports.getOrder = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    res.json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// =======================
// Update Status
// =======================
exports.updateStatus = async (req, res) => {

  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    // Socket.io
    const io = req.app.get("io");

    io.emit("status-update", order);

    res.json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// =======================
// Delete Order
// =======================
exports.deleteOrder = async (req, res) => {

  try {

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};