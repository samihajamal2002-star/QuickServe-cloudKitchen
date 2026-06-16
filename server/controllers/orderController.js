const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {

    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({
      createdAt: -1
    });

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  placeOrder,
  getOrders
};