const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
  },
  name: { type: String, required: true },
  size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  crust: { type: String, default: 'Classic Hand Tossed' },
  sauce: { type: String, default: 'Classic Tomato' },
  cheese: { type: String, default: 'Mozzarella' },
  extraToppings: [{ type: String }],
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
      default: () => `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, default: 'State' },
      zipCode: { type: String, required: true },
      phone: { type: String, required: true },
      instructions: { type: String, default: '' },
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true, default: 0 },
    deliveryFee: { type: Number, required: true, default: 49 },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['Razorpay', 'COD', 'Card'],
      default: 'Razorpay',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
    orderStatus: {
      type: String,
      enum: ['Received', 'Preparing', 'Baking', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Received',
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    estimatedDeliveryTime: {
      type: Date,
      default: () => new Date(Date.now() + 35 * 60 * 1000), // 35 mins from now
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
