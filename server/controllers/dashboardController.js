const User = require("../models/User");
const Menu = require("../models/Menu");
const Order = require("../models/Order");

exports.getDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalFoods = await Menu.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending"
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered"
    });

    const revenue = await Order.aggregate([
      {
        $match: {
          status: "Delivered"
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalPrice"
          }
        }
      }
    ]);

    res.json({

      totalUsers,

      totalFoods,

      totalOrders,

      pendingOrders,

      deliveredOrders,

      revenue: revenue.length ? revenue[0].total : 0

    });

  } catch (err) {

    res.status(500).json({

      message: err.message

    });

  }
};