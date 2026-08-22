const Order = require('../models/Order');
const Pizza = require('../models/Pizza');
const Ingredient = require('../models/Ingredient');
const User = require('../models/User');

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const activeOrders = await Order.countDocuments({
      orderStatus: { $in: ['Received', 'Preparing', 'Baking', 'Out for Delivery'] },
    });
    const completedOrders = await Order.countDocuments({ orderStatus: 'Delivered' });
    const totalUsers = await User.countDocuments();

    // Calculate total revenue from paid or delivered orders
    const revenueAgg = await Order.aggregate([
      { $match: { $or: [{ paymentStatus: 'Paid' }, { orderStatus: 'Delivered' }] } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // Count low stock items
    const lowStockCount = await Ingredient.countDocuments({
      $expr: { $lte: ['$stockQuantity', '$minStockThreshold'] },
    });

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        activeOrders,
        completedOrders,
        totalUsers,
        lowStockCount,
      },
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
