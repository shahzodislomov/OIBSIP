const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const { initIO } = require('./socket');
const { initStockCron } = require('./jobs/stockCron');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const Pizza = require('./models/Pizza');
const Ingredient = require('./models/Ingredient');
const { initialPizzas } = require('./controllers/pizzaController');
const { initialIngredients } = require('./controllers/inventoryController');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initIO(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🍕 Welcome to Pizza Delivery API',
    version: '1.0.0',
    status: 'Operational',
  });
});

// Auto seed helper
const autoSeedData = async () => {
  try {
    const pizzaCount = await Pizza.countDocuments();
    if (pizzaCount === 0) {
      await Pizza.insertMany(initialPizzas);
      console.log('🍕 Auto-seeded initial pizzas into database!');
    }
    const ingredientCount = await Ingredient.countDocuments();
    if (ingredientCount === 0) {
      await Ingredient.insertMany(initialIngredients);
      console.log('🧀 Auto-seeded initial ingredients into database!');
    }
  } catch (err) {
    console.error('Auto seed error:', err.message);
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await autoSeedData();
  initStockCron();

  server.listen(PORT, () => {
    console.log(`🚀 Pizza Delivery Backend running on port ${PORT}`);
  });
};

startServer();