const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  customerName: {
    type: String,
    required: true,
  },

  customerEmail: {
    type: String,
    required: true,
  },

  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    }
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  deliveryAddress: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Preparing", "On The Way", "Delivered"],
    default: "Pending",
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);