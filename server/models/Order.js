const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu", // 👈 আপনার মডেল নাম Menu.js তাই এখানে 'Menu' হবে
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
        price: {
          type: Number,
          default: 0,
        },
        name: {
          type: String,
        },
      },
    ],

    totalPrice: {
      type: Number,
    },

    totalAmount: {
      type: Number,
    },

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Cash On Delivery",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Preparing",
        "Cooking",
        "Ready",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save Hook to sync fields
orderSchema.pre("save", function () {
  if (!this.user && this.customer) this.user = this.customer;
  if (!this.customer && this.user) this.customer = this.user;
  if (!this.totalAmount && this.totalPrice) this.totalAmount = this.totalPrice;
  if (!this.totalPrice && this.totalAmount) this.totalPrice = this.totalAmount;
});

module.exports = mongoose.model("Order", orderSchema);