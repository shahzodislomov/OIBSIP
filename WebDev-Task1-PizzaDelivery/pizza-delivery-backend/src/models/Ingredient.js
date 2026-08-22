const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['crust', 'sauce', 'cheese', 'veggie', 'meat'],
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 100,
    },
    minStockThreshold: {
      type: Number,
      default: 20,
    },
    unit: {
      type: String,
      default: 'units',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: '🍕',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ingredient', ingredientSchema);
