const Ingredient = require('../models/Ingredient');

const initialIngredients = [
  // Crusts
  { name: 'Classic Hand Tossed', category: 'crust', price: 0, stockQuantity: 200, minStockThreshold: 30, unit: 'doughs', icon: '🍞' },
  { name: 'Thin & Crispy Crust', category: 'crust', price: 20, stockQuantity: 150, minStockThreshold: 25, unit: 'doughs', icon: '🥖' },
  { name: 'Cheese Burst Crust', category: 'crust', price: 99, stockQuantity: 120, minStockThreshold: 20, unit: 'doughs', icon: '🧀' },
  { name: 'Gluten-Free Crust', category: 'crust', price: 79, stockQuantity: 80, minStockThreshold: 15, unit: 'doughs', icon: '🌾' },

  // Sauces
  { name: 'Classic Tomato Sauce', category: 'sauce', price: 0, stockQuantity: 500, minStockThreshold: 50, unit: 'portions', icon: '🍅' },
  { name: 'Fiery Buffalo Sauce', category: 'sauce', price: 25, stockQuantity: 300, minStockThreshold: 40, unit: 'portions', icon: '🌶️' },
  { name: 'Creamy White Garlic Garlic Sauce', category: 'sauce', price: 35, stockQuantity: 250, minStockThreshold: 30, unit: 'portions', icon: '🧄' },
  { name: 'Basil Pesto Sauce', category: 'sauce', price: 45, stockQuantity: 180, minStockThreshold: 25, unit: 'portions', icon: '🌿' },

  // Cheeses
  { name: 'Mozzarella Cheese', category: 'cheese', price: 40, stockQuantity: 400, minStockThreshold: 60, unit: 'grams', icon: '🧀' },
  { name: 'Cheddar Blend', category: 'cheese', price: 50, stockQuantity: 300, minStockThreshold: 40, unit: 'grams', icon: '🧀' },
  { name: 'Feta Cheese Crumbles', category: 'cheese', price: 65, stockQuantity: 150, minStockThreshold: 20, unit: 'grams', icon: '🥛' },
  { name: 'Smoked Provolone', category: 'cheese', price: 70, stockQuantity: 120, minStockThreshold: 20, unit: 'grams', icon: '🧀' },

  // Veggies
  { name: 'Fresh Bell Peppers', category: 'veggie', price: 30, stockQuantity: 250, minStockThreshold: 30, unit: 'grams', icon: '🫑' },
  { name: 'Garlic Butter Mushrooms', category: 'veggie', price: 40, stockQuantity: 200, minStockThreshold: 25, unit: 'grams', icon: '🍄' },
  { name: 'Caramelized Red Onions', category: 'veggie', price: 25, stockQuantity: 300, minStockThreshold: 35, unit: 'grams', icon: '🧅' },
  { name: 'Sliced Black Olives', category: 'veggie', price: 35, stockQuantity: 220, minStockThreshold: 30, unit: 'grams', icon: '🫒' },
  { name: 'Cherry Tomatoes', category: 'veggie', price: 30, stockQuantity: 280, minStockThreshold: 35, unit: 'grams', icon: '🍅' },
  { name: 'Fresh Jalapeños', category: 'veggie', price: 30, stockQuantity: 180, minStockThreshold: 20, unit: 'grams', icon: '🌶️' },

  // Meats
  { name: 'Crispy Pepperoni', category: 'meat', price: 65, stockQuantity: 350, minStockThreshold: 45, unit: 'slices', icon: '🍖' },
  { name: 'Grilled BBQ Chicken', category: 'meat', price: 75, stockQuantity: 280, minStockThreshold: 35, unit: 'grams', icon: '🍗' },
  { name: 'Smoked Bacon Crumbles', category: 'meat', price: 80, stockQuantity: 190, minStockThreshold: 25, unit: 'grams', icon: '🥓' },
  { name: 'Italian Meatballs', category: 'meat', price: 85, stockQuantity: 160, minStockThreshold: 20, unit: 'pieces', icon: '🧆' }
];

const getInventory = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const ingredients = await Ingredient.find(query).sort({ category: 1, name: 1 });
    res.json({ success: true, count: ingredients.length, ingredients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const { stockQuantity, isAvailable } = req.body;
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    if (stockQuantity !== undefined) ingredient.stockQuantity = stockQuantity;
    if (isAvailable !== undefined) ingredient.isAvailable = isAvailable;

    await ingredient.save();
    res.json({ success: true, ingredient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const createIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json({ success: true, ingredient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const seedInventory = async (req, res) => {
  try {
    const count = await Ingredient.countDocuments();
    if (count > 0) {
      return res.json({ success: true, message: 'Inventory already seeded', count });
    }
    const created = await Ingredient.insertMany(initialIngredients);
    res.status(201).json({ success: true, message: 'Inventory seeded successfully', count: created.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLowStockAlerts = async (req, res) => {
  try {
    const lowStockItems = await Ingredient.find({
      $expr: { $lte: ['$stockQuantity', '$minStockThreshold'] }
    });
    res.json({ success: true, count: lowStockItems.length, lowStockItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getInventory,
  updateStock,
  createIngredient,
  seedInventory,
  getLowStockAlerts,
  initialIngredients,
};
