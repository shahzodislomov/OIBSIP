'use client';

import React, { useEffect, useState } from 'react';
import { Search, Star, Plus } from 'lucide-react';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<PizzaItem[]>([]);
  const [loading, setLoading] = useState(true);
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
        if (res.data?.pizzas) {
          setPizzas(res.data.pizzas);
        }
      } catch (err) {
        console.error('Failed to fetch pizzas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const filteredPizzas = pizzas
    .filter((pizza) => {
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
    })
    .sort((a, b) => {
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
    showToast(`${pizza.name} Added`, `Selected size: ${size.toUpperCase()} (${formatPrice(pizza.prices[size])})`, 'success');
    setActivePizza(null);
  };

  return (
    <div className="space-y-8 pb-20 pt-4">
      {/* Menu Header Banner */}
      <section className="glass-panel rounded-3xl p-8 border border-white/[0.07]">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-[#e05638] uppercase tracking-wider block">
            Craft Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Menu Selection
          </h1>
          <p className="text-stone-300 text-sm leading-relaxed">
            Every pizza is handcrafted with 48-hour slow-fermented dough and cooked fresh to order.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/[0.07]">
          <div className="flex-1 max-w-md">
            <Input
              icon={<Search className="w-4 h-4 text-stone-400" />}
              placeholder="Search pizzas or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#121219] border-white/10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                vegOnly
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                  : 'bg-[#161620] text-stone-400 border-white/10 hover:text-white'
              }`}
            >
              Vegetarian
            </button>

            <button
              onClick={() => setSpicyOnly(!spicyOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                spicyOnly
                  ? 'bg-red-950/80 text-red-300 border-red-500/40'
                  : 'bg-[#161620] text-stone-400 border-white/10 hover:text-white'
              }`}
            >
              Spicy
            </button>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-[#161620] text-stone-200 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="price-low">Sort: Price (Low to High)</option>
              <option value="price-high">Sort: Price (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#e05638] text-white shadow-sm font-semibold'
                  : 'bg-[#161620] text-stone-400 hover:text-white border border-white/[0.05]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Pizza Grid */}
      <section>
        {loading ? (
          <div className="text-center py-12 text-stone-400 text-sm">Loading catalog...</div>
        ) : filteredPizzas.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center space-y-3">
            <h3 className="text-lg font-bold text-white">No pizzas found</h3>
            <p className="text-xs text-stone-400">Try adjusting your filters or search terms.</p>
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
              <SpotlightCard key={pizza._id} className="flex flex-col justify-between h-full p-5 rounded-2xl bg-[#161620]/80">
                <div>
                  <div
                    onClick={() => {
                      setActivePizza(pizza);
                      setSelectedSize('medium');
                    }}
                    className="relative overflow-hidden rounded-xl mb-4 h-48 cursor-pointer"
                  >
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {pizza.isVegetarian && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold">
                          Vegetarian
                        </span>
                      )}
                      {pizza.isSpicy && (
                        <span className="px-2 py-0.5 rounded-md bg-red-950/90 text-red-300 border border-red-500/30 text-[10px] font-semibold">
                          Spicy
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
                      className="font-bold text-base text-white hover:text-[#e05638] transition-colors cursor-pointer"
                    >
                      {pizza.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/10">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{pizza.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {pizza.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Starts at</span>
                    <span className="text-base font-bold text-[#e05638]">
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
                      className="rounded-xl text-xs border-white/10 text-stone-200"
                    >
                      Options
                    </Button>
                    <Button
                      onClick={() => handleAddToCart(pizza, 'medium')}
                      variant="default"
                      size="sm"
                      className="rounded-xl gap-1 text-xs font-semibold"
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
          <div className="space-y-5">
            <img
              src={activePizza.image}
              alt={activePizza.name}
              className="w-full h-44 object-cover rounded-xl border border-white/10"
            />

            <div>
              <p className="text-xs text-stone-300 leading-relaxed">{activePizza.description}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Select Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#e05638]/20 border-[#e05638] text-white'
                        : 'bg-[#161620] border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold capitalize">{size}</span>
                    <span className="text-[10px] text-stone-400">
                      {size === 'small' ? '10"' : size === 'medium' ? '12"' : '14"'}
                    </span>
                    <span className="text-xs font-bold text-[#e05638] mt-1">
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
              className="w-full rounded-xl font-bold"
            >
              Add {selectedSize.toUpperCase()} to Cart ({formatPrice(activePizza.prices[selectedSize])})
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
