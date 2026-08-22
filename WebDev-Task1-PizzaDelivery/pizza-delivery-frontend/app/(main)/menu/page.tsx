'use client';

import React, { useEffect, useState } from 'react';
import { Search, Filter, SlidersHorizontal, Star, Flame, Sparkles, Plus, Check } from 'lucide-react';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/components/ui/toast';
import { formatPrice } from '@/lib/utils';
import axios from 'axios';

interface PizzaItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  prices: { small: number; medium: number; large: number };
  image: string;
  rating: number;
  numReviews: number;
  isVegetarian: boolean;
  isSpicy: boolean;
  ingredients?: string[];
}

const categories = ['All', 'Classic', 'Gourmet', 'Veggie', 'Meat Lovers', 'Specialty', 'Sides', 'Desserts'];

const initialPizzas: PizzaItem[] = [
  {
    _id: '1',
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
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Fresh Basil', 'Olive Oil'],
  },
  {
    _id: '2',
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
    ingredients: ['Pepperoni', 'Mozzarella', 'Marinara', 'Oregano'],
  },
  {
    _id: '3',
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
    ingredients: ['Mushrooms', 'Truffle Oil', 'Ricotta', 'Provolone'],
  },
  {
    _id: '4',
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
    ingredients: ['Grilled Chicken', 'BBQ Sauce', 'Red Onions', 'Mozzarella'],
  },
  {
    _id: '5',
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
    ingredients: ['Bell Peppers', 'Tomatoes', 'Olives', 'Feta', 'Pesto'],
  },
  {
    _id: '6',
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
    ingredients: ['Four Cheeses', 'Honey Drizzle', 'Herbs'],
  },
];

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<PizzaItem[]>(initialPizzas);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('rating');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [spicyOnly, setSpicyOnly] = useState<boolean>(false);
  
  // Customization Modal
  const [activePizza, setActivePizza] = useState<PizzaItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');

  const { addItem } = useCartStore();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/pizzas');
        if (res.data?.pizzas?.length) {
          setPizzas(res.data.pizzas);
        }
      } catch (err) {
        // Fallback to local state if backend down
      }
    };
    fetchPizzas();
  }, []);

  const filteredPizzas = pizzas.filter((pizza) => {
    if (selectedCategory !== 'All' && pizza.category !== selectedCategory) return false;
    if (vegOnly && !pizza.isVegetarian) return false;
    if (spicyOnly && !pizza.isSpicy) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = pizza.name.toLowerCase().includes(q);
      const matchDesc = pizza.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortOption === 'price-low') return a.prices.medium - b.prices.medium;
    if (sortOption === 'price-high') return b.prices.medium - a.prices.medium;
    return b.rating - a.rating;
  });

  const handleAddToCart = (pizza: PizzaItem, size: 'small' | 'medium' | 'large' = 'medium') => {
    addItem({
      pizzaId: pizza._id,
      name: pizza.name,
      size,
      price: pizza.prices[size],
      image: pizza.image,
      quantity: 1,
    });
    showToast(`${pizza.name} Added!`, `Selected size: ${size.toUpperCase()} (${formatPrice(pizza.prices[size])})`, 'success');
    setActivePizza(null);
  };

  return (
    <div className="space-y-10 pb-20 pt-6">
      {/* Menu Header Banner */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <Badge variant="accent" className="gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Artisanal Menu
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Explore Our Stone-Fired Craft
          </h1>
          <p className="text-stone-300 text-sm leading-relaxed">
            Every pizza is handcrafted using 48-hour slow-fermented dough, San Marzano tomato sauce, and premium ingredients.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <Input
              icon={<Search className="w-4 h-4 text-stone-400" />}
              placeholder="Search pizzas, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-stone-950 border-white/10"
            />
          </div>

          {/* Toggle Buttons & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                vegOnly
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-stone-900 text-stone-400 border-white/10 hover:text-white'
              }`}
            >
              🌱 Veg Only
            </button>

            <button
              onClick={() => setSpicyOnly(!spicyOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                spicyOnly
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-stone-900 text-stone-400 border-white/10 hover:text-white'
              }`}
            >
              🌶️ Spicy Only
            </button>

            {/* Sort Select */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-stone-900 text-stone-200 border border-white/10 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="price-low">Sort: Price (Low to High)</option>
              <option value="price-high">Sort: Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-stone-900/80 text-stone-400 hover:text-white hover:bg-stone-800 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Pizza Cards Grid */}
      <section>
        {filteredPizzas.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center space-y-3">
            <div className="text-5xl">🔍</div>
            <h3 className="text-xl font-bold text-white">No pizzas match your filters</h3>
            <p className="text-xs text-stone-400">Try resetting your search or category selection.</p>
            <Button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setVegOnly(false);
                setSpicyOnly(false);
              }}
              variant="outline"
              size="sm"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPizzas.map((pizza) => (
              <SpotlightCard key={pizza._id} className="flex flex-col justify-between h-full group">
                <div>
                  <div
                    onClick={() => {
                      setActivePizza(pizza);
                      setSelectedSize('medium');
                    }}
                    className="relative overflow-hidden rounded-2xl mb-4 h-52 cursor-pointer"
                  >
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {pizza.isVegetarian && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                          🌱 VEG
                        </span>
                      )}
                      {pizza.isSpicy && (
                        <span className="px-2 py-0.5 rounded-full bg-red-950/90 text-red-400 border border-red-500/40 text-[10px] font-bold">
                          🌶️ SPICY
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <h3
                      onClick={() => {
                        setActivePizza(pizza);
                        setSelectedSize('medium');
                      }}
                      className="font-bold text-lg text-stone-100 group-hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {pizza.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{pizza.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {pizza.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Starts at</span>
                    <span className="text-lg font-extrabold text-orange-400">
                      {formatPrice(pizza.prices.medium)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setActivePizza(pizza);
                        setSelectedSize('medium');
                      }}
                      variant="outline"
                      size="sm"
                      className="rounded-xl text-xs"
                    >
                      Options
                    </Button>
                    <Button
                      onClick={() => handleAddToCart(pizza, 'medium')}
                      variant="default"
                      size="sm"
                      className="rounded-xl gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </Button>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </section>

      {/* Pizza Customization / Size Selection Modal */}
      {activePizza && (
        <Dialog
          isOpen={!!activePizza}
          onClose={() => setActivePizza(null)}
          title={activePizza.name}
        >
          <div className="space-y-6">
            <img
              src={activePizza.image}
              alt={activePizza.name}
              className="w-full h-48 object-cover rounded-2xl border border-white/10"
            />

            <div>
              <p className="text-xs text-stone-300 leading-relaxed">{activePizza.description}</p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                Select Crust Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                      selectedSize === size
                        ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-stone-900 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold capitalize">{size}</span>
                    <span className="text-[10px] text-stone-400">
                      {size === 'small' ? '10"' : size === 'medium' ? '12"' : '14"'}
                    </span>
                    <span className="text-xs font-extrabold text-orange-400 mt-1">
                      {formatPrice(activePizza.prices[size])}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => handleAddToCart(activePizza, selectedSize)}
              variant="gradient"
              size="lg"
              className="w-full rounded-2xl font-bold shadow-xl shadow-orange-500/30"
            >
              Add {selectedSize.toUpperCase()} to Cart ({formatPrice(activePizza.prices[selectedSize])})
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
