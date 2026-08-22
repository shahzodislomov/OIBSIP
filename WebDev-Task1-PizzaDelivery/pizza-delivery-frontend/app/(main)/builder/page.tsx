'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Plus, Minus, RotateCcw, ShoppingBag, Flame } from 'lucide-react';
import { animate } from 'animejs';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/components/ui/toast';
import { formatPrice } from '@/lib/utils';
import axios from 'axios';

interface IngredientItem {
  _id: string;
  name: string;
  category: 'crust' | 'sauce' | 'cheese' | 'veggie' | 'meat';
  price: number;
  icon: string;
}

const fallbackIngredients: IngredientItem[] = [
  // Crusts
  { _id: 'c1', name: 'Classic Hand Tossed', category: 'crust', price: 0, icon: '🍞' },
  { _id: 'c2', name: 'Thin & Crispy Crust', category: 'crust', price: 20, icon: '🥖' },
  { _id: 'c3', name: 'Cheese Burst Crust', category: 'crust', price: 99, icon: '🧀' },
  { _id: 'c4', name: 'Gluten-Free Crust', category: 'crust', price: 79, icon: '🌾' },

  // Sauces
  { _id: 's1', name: 'Classic Tomato Sauce', category: 'sauce', price: 0, icon: '🍅' },
  { _id: 's2', name: 'Fiery Buffalo Sauce', category: 'sauce', price: 25, icon: '🌶️' },
  { _id: 's3', name: 'White Garlic Sauce', category: 'sauce', price: 35, icon: '🧄' },
  { _id: 's4', name: 'Basil Pesto Sauce', category: 'sauce', price: 45, icon: '🌿' },

  // Cheeses
  { _id: 'ch1', name: 'Mozzarella Cheese', category: 'cheese', price: 40, icon: '🧀' },
  { _id: 'ch2', name: 'Cheddar Blend', category: 'cheese', price: 50, icon: '🧀' },
  { _id: 'ch3', name: 'Feta Cheese Crumbles', category: 'cheese', price: 65, icon: '🥛' },

  // Veggies
  { _id: 'v1', name: 'Fresh Bell Peppers', category: 'veggie', price: 30, icon: '🫑' },
  { _id: 'v2', name: 'Garlic Mushrooms', category: 'veggie', price: 40, icon: '🍄' },
  { _id: 'v3', name: 'Caramelized Onions', category: 'veggie', price: 25, icon: '🧅' },
  { _id: 'v4', name: 'Sliced Black Olives', category: 'veggie', price: 35, icon: '🫒' },
  { _id: 'v5', name: 'Cherry Tomatoes', category: 'veggie', price: 30, icon: '🍅' },

  // Meats
  { _id: 'm1', name: 'Crispy Pepperoni', category: 'meat', price: 65, icon: '🍖' },
  { _id: 'm2', name: 'Grilled BBQ Chicken', category: 'meat', price: 75, icon: '🍗' },
  { _id: 'm3', name: 'Smoked Bacon', category: 'meat', price: 80, icon: '🥓' },
];

const sizePrices = {
  small: 249,
  medium: 349,
  large: 499,
};

export default function CustomBuilderPage() {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedCrust, setSelectedCrust] = useState<string>('Classic Hand Tossed');
  const [selectedSauce, setSelectedSauce] = useState<string>('Classic Tomato Sauce');
  const [selectedCheese, setSelectedCheese] = useState<string>('Mozzarella Cheese');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Fresh Bell Peppers', 'Crispy Pepperoni']);
  const [activeTab, setActiveTab] = useState<'crust' | 'sauce' | 'cheese' | 'veggie' | 'meat'>('crust');

  const { addItem } = useCartStore();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/inventory');
        if (res.data?.ingredients?.length) {
          setIngredients(res.data.ingredients);
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchInventory();
  }, []);

  const triggerToppingPopAnimation = () => {
    animate('.pizza-canvas-preview', {
      scale: [0.95, 1.05, 1],
      rotate: [0, 4, 0],
      duration: 500,
      easing: 'easeOutElastic(1, .5)',
    });
  };

  const toggleTopping = (name: string) => {
    if (selectedToppings.includes(name)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== name));
    } else {
      setSelectedToppings([...selectedToppings, name]);
      triggerToppingPopAnimation();
    }
  };

  // Calculate live price
  const basePrice = sizePrices[selectedSize];
  const crustObj = ingredients.find((i) => i.name === selectedCrust);
  const sauceObj = ingredients.find((i) => i.name === selectedSauce);
  const cheeseObj = ingredients.find((i) => i.name === selectedCheese);

  const crustPrice = crustObj?.price || 0;
  const saucePrice = sauceObj?.price || 0;
  const cheesePrice = cheeseObj?.price || 0;

  const toppingsPrice = selectedToppings.reduce((sum, name) => {
    const topObj = ingredients.find((i) => i.name === name);
    return sum + (topObj?.price || 0);
  }, 0);

  const totalPrice = basePrice + crustPrice + saucePrice + cheesePrice + toppingsPrice;

  const handleAddCustomPizzaToCart = () => {
    addItem({
      name: `Custom ${selectedCrust} Pizza`,
      size: selectedSize,
      crust: selectedCrust,
      sauce: selectedSauce,
      cheese: selectedCheese,
      extraToppings: selectedToppings,
      price: totalPrice,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
    });

    showToast('Custom Pizza Added!', `Added to your cart for ${formatPrice(totalPrice)}`, 'success');
  };

  const crusts = ingredients.filter((i) => i.category === 'crust');
  const sauces = ingredients.filter((i) => i.category === 'sauce');
  const cheeses = ingredients.filter((i) => i.category === 'cheese');
  const veggies = ingredients.filter((i) => i.category === 'veggie');
  const meats = ingredients.filter((i) => i.category === 'meat');

  return (
    <div className="space-y-10 pb-20 pt-6">
      {/* Header Banner */}
      <section className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="accent" className="mb-2 gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Visual Studio
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Custom Pizza Studio
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Build your ideal pizza layer by layer with live price and visual updates.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedSize('medium');
            setSelectedCrust('Classic Hand Tossed');
            setSelectedSauce('Classic Tomato Sauce');
            setSelectedCheese('Mozzarella Cheese');
            setSelectedToppings([]);
          }}
          variant="outline"
          size="sm"
          className="gap-2 rounded-xl"
        >
          <RotateCcw className="w-4 h-4 text-stone-400" />
          Reset All
        </Button>
      </section>

      {/* Main Studio Grid */}
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
        {/* Left Column: Interactive 2D Canvas Preview */}
        <div className="sticky top-28 glass-panel rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center min-h-[460px] text-center space-y-6">
          <div className="relative">
            {/* Layered Pizza Canvas */}
            <div className="pizza-canvas-preview relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-amber-700/40 border-8 border-amber-900/60 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-300">
              {/* Dough Base */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 border-4 border-amber-700/50 shadow-inner flex items-center justify-center">
                {/* Sauce Layer */}
                <div
                  className={`absolute inset-4 rounded-full transition-colors duration-500 ${
                    selectedSauce.includes('Pesto')
                      ? 'bg-emerald-700/80'
                      : selectedSauce.includes('White')
                      ? 'bg-amber-100/80'
                      : selectedSauce.includes('Buffalo')
                      ? 'bg-red-600/90'
                      : 'bg-red-700/90'
                  }`}
                >
                  {/* Cheese Layer */}
                  <div className="absolute inset-2 rounded-full bg-amber-200/80 backdrop-blur-[1px] flex items-center justify-center flex-wrap p-4 gap-3">
                    {/* Render Selected Toppings icons */}
                    {selectedToppings.map((topName, idx) => {
                      const topObj = ingredients.find((i) => i.name === topName);
                      return (
                        <span
                          key={idx}
                          className="text-2xl animate-bounce filter drop-shadow-md transition-transform"
                        >
                          {topObj?.icon || '🍕'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-xl text-white">
              {selectedSize.toUpperCase()} 12" • {selectedCrust}
            </h3>
            <p className="text-xs text-stone-400 max-w-sm">
              Sauce: <span className="text-amber-400 font-semibold">{selectedSauce}</span> • Cheese:{' '}
              <span className="text-amber-400 font-semibold">{selectedCheese}</span>
            </p>
            {selectedToppings.length > 0 && (
              <p className="text-xs text-emerald-400/90 font-medium">
                Toppings: {selectedToppings.join(', ')}
              </p>
            )}
          </div>

          <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-400 block">Total Price</span>
              <span className="text-3xl font-black text-orange-400">{formatPrice(totalPrice)}</span>
            </div>

            <Button
              onClick={handleAddCustomPizzaToCart}
              variant="gradient"
              size="lg"
              className="rounded-2xl gap-2 shadow-xl shadow-orange-500/30"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add Custom Order</span>
            </Button>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="space-y-6">
          {/* Step 1: Size Choice */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider">
              1. Choose Size
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    selectedSize === size
                      ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                      : 'bg-stone-900 border-white/10 text-stone-400 hover:text-white'
                  }`}
                >
                  <div className="font-extrabold text-sm capitalize">{size}</div>
                  <div className="text-[11px] text-stone-400">
                    {size === 'small' ? '10"' : size === 'medium' ? '12"' : '14"'}
                  </div>
                  <div className="text-xs font-bold text-orange-400 mt-1">
                    {formatPrice(sizePrices[size])}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(['crust', 'sauce', 'cheese', 'veggie', 'meat'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'bg-stone-900 text-stone-400 border border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tab Options Content */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            {activeTab === 'crust' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-200">Select Crust Type</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {crusts.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => setSelectedCrust(item.name)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        selectedCrust === item.name
                          ? 'bg-orange-500/20 border-orange-500 text-white'
                          : 'bg-stone-900/80 border-white/10 text-stone-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-orange-400 font-semibold">
                            {item.price === 0 ? 'Included' : `+ ${formatPrice(item.price)}`}
                          </p>
                        </div>
                      </div>
                      {selectedCrust === item.name && <Check className="w-5 h-5 text-orange-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sauce' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-200">Select House Sauce</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sauces.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => setSelectedSauce(item.name)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        selectedSauce === item.name
                          ? 'bg-orange-500/20 border-orange-500 text-white'
                          : 'bg-stone-900/80 border-white/10 text-stone-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-orange-400 font-semibold">
                            {item.price === 0 ? 'Included' : `+ ${formatPrice(item.price)}`}
                          </p>
                        </div>
                      </div>
                      {selectedSauce === item.name && <Check className="w-5 h-5 text-orange-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cheese' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-200">Select Cheese Base</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cheeses.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => setSelectedCheese(item.name)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        selectedCheese === item.name
                          ? 'bg-orange-500/20 border-orange-500 text-white'
                          : 'bg-stone-900/80 border-white/10 text-stone-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-orange-400 font-semibold">
                            + {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                      {selectedCheese === item.name && <Check className="w-5 h-5 text-orange-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'veggie' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-200">Add Fresh Veggies</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {veggies.map((item) => {
                    const isSelected = selectedToppings.includes(item.name);
                    return (
                      <button
                        key={item._id}
                        onClick={() => toggleTopping(item.name)}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-500 text-white'
                            : 'bg-stone-900/80 border-white/10 text-stone-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-xs text-orange-400 font-semibold">
                              + {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                        {isSelected ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Plus className="w-4 h-4 text-stone-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'meat' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-200">Add Gourmet Meats</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {meats.map((item) => {
                    const isSelected = selectedToppings.includes(item.name);
                    return (
                      <button
                        key={item._id}
                        onClick={() => toggleTopping(item.name)}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-white'
                            : 'bg-stone-900/80 border-white/10 text-stone-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-xs text-orange-400 font-semibold">
                              + {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                        {isSelected ? (
                          <Check className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Plus className="w-4 h-4 text-stone-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
