const Order = require("../models/Order");
const User = require("../models/User");
const Menu = require("../models/Menu");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    
    // role 'user' বা 'customer' যাই থাকুক তা কাউন্ট করবে
    const totalCustomers = await User.countDocuments({
      role: { $in: ["user", "customer"] }
    });
    
    const totalFoods = await Menu.countDocuments();

    // Delivered অর্ডারগুলোর totalPrice বা totalAmount যোগফল
    const revenueData = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { 
        $group: { 
          _id: null, 
          totalRevenue: { $sum: { $ifNull: ["$totalPrice", "$totalAmount"] } } 
        } 
      }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // সাম্প্রতিক ৫টি অর্ডার নিরাপদভাবে ফেচ করা
    const recentOrders = await Order.find()
      .populate({ path: "customer", select: "name", strictPopulate: false })
      .populate({ path: "user", select: "name", strictPopulate: false })
      .populate({ path: "items.food", select: "name title", strictPopulate: false })
      .sort({ createdAt: -1 })
      .limit(5);

    // ফ্রন্টএন্ড যেভাবে ডেটা চাচ্ছে সেভাবে ফ্ল্যাট অবজেক্ট + নেস্টেড অবজেক্ট দুটিই পাঠানো হলো
    res.status(200).json({
      totalOrders,
      totalCustomers,
      totalFoods,
      totalRevenue,
      stats: {
        totalOrders,
        totalCustomers,
        totalFoods,
        totalRevenue
      },
      recentOrders: recentOrders || []
    });
  } catch (err) {
    console.error("Error in getDashboardStats:", err);
    res.status(500).json({ message: err.message || "Failed to fetch dashboard stats" });
  }
};