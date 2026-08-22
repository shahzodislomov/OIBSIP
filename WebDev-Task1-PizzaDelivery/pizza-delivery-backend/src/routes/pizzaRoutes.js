const express = require('express');
const router = express.Router();
const {
  getPizzas,
  getPizzaById,
  seedPizzas,
  createPizza,
  updatePizza,
  deletePizza,
} = require('../controllers/pizzaController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getPizzas);
router.post('/seed', seedPizzas);
router.get('/:id', getPizzaById);

router.post('/', protect, adminOnly, createPizza);
router.put('/:id', protect, adminOnly, updatePizza);
router.delete('/:id', protect, adminOnly, deletePizza);

module.exports = router;
