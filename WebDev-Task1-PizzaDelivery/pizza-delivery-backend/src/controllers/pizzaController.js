const Pizza = require('../models/Pizza');

const initialPizzas = [
  {
    name: 'Margherita Supreme',
    slug: 'margherita-supreme',
    description: 'Classic artisanal tomato sauce, freshly torn mozzarella, sweet basil leaves, olive oil drizzle.',
    category: 'Classic',
    prices: { small: 249, medium: 399, large: 549 },
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    numReviews: 88,
    isVegetarian: true,
    isSpicy: false,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Fresh Basil', 'Extra Virgin Olive Oil'],
  },
  {
    name: 'Pepperoni Overload',
    slug: 'pepperoni-overload',
    description: 'Double layer of crispy cupped pepperoni, aged mozzarella, rich marinara sauce, and oregano.',
    category: 'Meat Lovers',
    prices: { small: 299, medium: 499, large: 699 },
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    numReviews: 142,
    isVegetarian: false,
    isSpicy: true,
    ingredients: ['Pepperoni', 'Mozzarella', 'Marinara Sauce', 'Oregano'],
  },
  {
    name: 'Truffle Mushroom Gourmet',
    slug: 'truffle-mushroom-gourmet',
    description: 'Wild garlic roasted mushrooms, black truffle oil infusion, creamy ricotta, and smoked provolone.',
    category: 'Gourmet',
    prices: { small: 349, medium: 579, large: 799 },
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    numReviews: 64,
    isVegetarian: true,
    isSpicy: false,
    ingredients: ['Roasted Mushrooms', 'Black Truffle Oil', 'Ricotta', 'Smoked Provolone', 'Thyme'],
  },
  {
    name: 'Fiery BBQ Chicken',
    slug: 'fiery-bbq-chicken',
    description: 'Smoky grilled chicken breast, spicy habanero BBQ sauce, caramelized red onions, fresh cilantro.',
    category: 'Specialty',
    prices: { small: 329, medium: 529, large: 729 },
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    numReviews: 96,
    isVegetarian: false,
    isSpicy: true,
    ingredients: ['Grilled Chicken', 'BBQ Sauce', 'Red Onions', 'Cilantro', 'Mozzarella'],
  },
  {
    name: 'Garden Harvest Veggie',
    slug: 'garden-harvest-veggie',
    description: 'Bell peppers, cherry tomatoes, kalamata olives, artichoke hearts, crumbled feta cheese, and pesto.',
    category: 'Veggie',
    prices: { small: 279, medium: 449, large: 629 },
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    rating: 4.85,
    numReviews: 75,
    isVegetarian: true,
    isSpicy: false,
    ingredients: ['Bell Peppers', 'Cherry Tomatoes', 'Olives', 'Feta', 'Basil Pesto'],
  },
  {
    name: 'Quattro Formaggi',
    slug: 'quattro-formaggi',
    description: 'Decadent blend of Gorgonzola piccante, Gorgonzola dolce, Fontina, Parmigiano Reggiano, and Mozzarella.',
    category: 'Gourmet',
    prices: { small: 349, medium: 569, large: 789 },
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    numReviews: 53,
    isVegetarian: true,
    isSpicy: false,
    ingredients: ['Gorgonzola', 'Fontina', 'Parmigiano', 'Mozzarella', 'Honey Drizzle'],
  },
  {
    name: 'Cheesy Garlic Breadsticks',
    slug: 'cheesy-garlic-breadsticks',
    description: 'Freshly baked buttery dough brushed with garlic herb butter and melted mozzarella.',
    category: 'Sides',
    prices: { small: 149, medium: 199, large: 249 },
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
    rating: 4.75,
    numReviews: 110,
    isVegetarian: true,
    isSpicy: false,
    ingredients: ['Garlic Butter', 'Mozzarella', 'Parsley'],
  },
  {
    name: 'Choco Lava Cake',
    slug: 'choco-lava-cake',
    description: 'Warm chocolate cake with a gooey, molten chocolate center.',
    category: 'Desserts',
    prices: { small: 129, medium: 129, large: 129 },
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    numReviews: 180,
    isVegetarian: true,
    isSpicy: false,
    ingredients: ['Dark Chocolate', 'Butter', 'Cocoa'],
  },
  {
    name: 'Smoky Artisan Burrata',
    slug: 'smoky-artisan-burrata',
    description: 'Creamy burrata ball placed fresh after baking, prosciutto di Parma, cherry tomatoes, and aged balsamic glaze.',
    category: 'Gourmet',
    prices: { small: 399, medium: 599, large: 849 },
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    numReviews: 45,
    isVegetarian: false,
    isSpicy: false,
    ingredients: ['Fresh Burrata', 'Prosciutto', 'Cherry Tomatoes', 'Balsamic Glaze', 'Arugula'],
  }
];

const getPizzas = async (req, res) => {
  try {
    const { category, search, vegetarian, spicy, sort } = req.query;
    let query = { isAvailable: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (vegetarian === 'true') {
      query.isVegetarian = true;
    }

    if (spicy === 'true') {
      query.isSpicy = true;
    }

    let sortOptions = { rating: -1 };
    if (sort === 'price-low') sortOptions = { 'prices.medium': 1 };
    if (sort === 'price-high') sortOptions = { 'prices.medium': -1 };
    if (sort === 'rating') sortOptions = { rating: -1 };

    const pizzas = await Pizza.find(query).sort(sortOptions);
    res.json({ success: true, count: pizzas.length, pizzas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ success: false, message: 'Pizza not found' });
    }
    res.json({ success: true, pizza });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const seedPizzas = async (req, res) => {
  try {
    const count = await Pizza.countDocuments();
    if (count > 0) {
      return res.json({ success: true, message: 'Pizzas already seeded', count });
    }
    const created = await Pizza.insertMany(initialPizzas);
    res.status(201).json({ success: true, message: 'Pizzas seeded successfully', count: created.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);
    res.status(201).json({ success: true, pizza });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pizza) return res.status(404).json({ success: false, message: 'Pizza not found' });
    res.json({ success: true, pizza });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) return res.status(404).json({ success: false, message: 'Pizza not found' });
    res.json({ success: true, message: 'Pizza deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPizzas,
  getPizzaById,
  seedPizzas,
  createPizza,
  updatePizza,
  deletePizza,
  initialPizzas,
};
