const express = require('express');
const router = express.Router();
const {
  getInventory,
  updateStock,
  createIngredient,
  seedInventory,
  getLowStockAlerts,
} = require('../controllers/inventoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getInventory);
router.post('/seed', seedInventory);

router.get('/low-stock', protect, adminOnly, getLowStockAlerts);
router.post('/', protect, adminOnly, createIngredient);
router.patch('/:id', protect, adminOnly, updateStock);

module.exports = router;
