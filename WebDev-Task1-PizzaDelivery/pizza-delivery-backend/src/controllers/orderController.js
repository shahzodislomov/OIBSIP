const Order = require('../models/Order');
const Ingredient = require('../models/Ingredient');
const { getIO } = require('../socket');

// Helper to deduct ingredient stock
const deductInventoryStock = async (items) => {
  try {
    for (const item of items) {
      // Find matching crust ingredient
      if (item.crust) {
        await Ingredient.updateOne(
          { name: item.crust, stockQuantity: { $gte: item.quantity } },
          { $inc: { stockQuantity: -item.quantity } }
        );
      }
      // Find matching extra toppings
      if (item.extraToppings && item.extraToppings.length > 0) {
        for (const toppingName of item.extraToppings) {
          await Ingredient.updateOne(
            { name: toppingName, stockQuantity: { $gte: item.quantity } },
            { $inc: { stockQuantity: -item.quantity } }
          );
        }
      }
    }
  } catch (err) {
    console.error('Inventory stock deduction error:', err);
  }
};

const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod, subtotal, tax, deliveryFee, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order items are required' });
    }

    if (!deliveryAddress || !deliveryAddress.street || !deliveryAddress.zipCode) {
      return res.status(400).json({ success: false, message: 'Complete delivery address is required' });
    }

    const calculatedSubtotal = subtotal || items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const calculatedTax = tax !== undefined ? tax : Math.round(calculatedSubtotal * 0.05);
    const calculatedDeliveryFee = deliveryFee !== undefined ? deliveryFee : (calculatedSubtotal > 499 ? 0 : 49);
    const calculatedTotal = totalAmount || (calculatedSubtotal + calculatedTax + calculatedDeliveryFee);

    const order = await Order.create({
      user: req.user._id,
      items,
      deliveryAddress,
      subtotal: calculatedSubtotal,
      tax: calculatedTax,
      deliveryFee: calculatedDeliveryFee,
      totalAmount: calculatedTotal,
      paymentMethod: paymentMethod || 'Razorpay',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Pending',
      orderStatus: 'Received',
    });

    // Deduct stock asynchronously
    deductInventoryStock(items);

    // Emit Socket.IO event for new order to admin
    try {
      const io = getIO();
      if (io) {
        io.emit('newOrderPlaced', order);
      }
    } catch (e) {
      console.log('Socket broadcast skipped:', e.message);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Verify permission (must be owner or admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin' && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this order' });
    }

    if (['Out for Delivery', 'Delivered', 'Cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({ success: false, message: `Cannot cancel order in ${order.orderStatus} state` });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    try {
      const io = getIO();
      if (io) {
        io.to(`order_${order._id}`).emit('orderStatusUpdated', {
          orderId: order._id,
          orderStatus: 'Cancelled',
          updatedAt: order.updatedAt,
        });
      }
    } catch (e) {}

    res.json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { status, limit = 20, page = 1 } = req.query;
    let query = {};
    if (status && status !== 'All') {
      query.orderStatus = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    if (orderStatus === 'Delivered' && order.paymentMethod === 'COD') {
      order.paymentStatus = 'Paid';
    }

    await order.save();

    // Emit live Socket.IO update
    try {
      const io = getIO();
      if (io) {
        io.to(`order_${order._id}`).emit('orderStatusUpdated', {
          orderId: order._id,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          updatedAt: order.updatedAt,
        });
        io.emit('adminOrderUpdated', order);
      }
    } catch (e) {}

    res.json({ success: true, message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
