'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Star, Flame, ChevronRight } from 'lucide-react';
import { SplitText } from '@/components/animations/split-text';
import { DecryptedText } from '@/components/animations/decrypted-text';
import { MagnetButton } from '@/components/animations/magnet-button';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { FloatingPizzas } from '@/components/animations/floating-pizzas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
}

export default function HomePage() {
  const [pizzas, setPizzas] = useState<PizzaItem[]>([]);
  const [loading, setLoading] = useState(true);
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
        console.error('Error fetching pizzas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const handleQuickAdd = (pizza: PizzaItem) => {
    addItem({
      pizzaId: pizza._id,
      name: pizza.name,
      size: 'medium',
      price: pizza.prices.medium,
      image: pizza.image,
      quantity: 1,
    });
    showToast(`${pizza.name} added to cart!`, 'Medium size (12") added successfully.', 'success');
  };

  const featuredPizza = pizzas[0];

  return (
    <div className="relative space-y-20 pb-20 pt-6">
      <FloatingPizzas />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[36px] glass-panel p-8 sm:p-12 border border-white/10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-orange-500/30 text-orange-400 text-xs font-semibold shadow-inner">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>HAND-TOSSED STONE-FIRED perfection</span>
            </div>

            <div className="space-y-4">
              <SplitText
                text="Artisanal Pizza Delivered Hot & Fresh"
                className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight"
              />
              <p className="text-stone-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Experience wood-fired crusts, rich small-batch marinara, and melted imported cheeses crafted fresh for your midnight cravings or weekend celebrations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/menu">
                <MagnetButton magnetStrength={0.25}>
                  <Button variant="gradient" size="lg" className="rounded-2xl gap-2 text-base px-7 shadow-xl shadow-orange-500/30">
                    <span>Order Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </MagnetButton>
              </Link>

              <Link href="/builder">
                <Button variant="outline" size="lg" className="rounded-2xl gap-2 border-white/20">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Build Custom Pizza</span>
                </Button>
              </Link>
            </div>

            {/* Quick Stats Ticker */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-orange-400">
                  <DecryptedText text="25 MINS" />
                </div>
                <p className="text-xs text-stone-400">Avg. Delivery Time</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                  <DecryptedText text="4.9 ★" />
                </div>
                <p className="text-xs text-stone-400">Customer Rating</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  <DecryptedText text="100%" />
                </div>
                <p className="text-xs text-stone-400">Fresh Ingredients</p>
              </div>
            </div>
          </div>

          {/* Hero Feature Showcase Card */}
          {featuredPizza && (
            <div className="relative flex justify-center">
              <SpotlightCard className="w-full max-w-md bg-stone-950/80 border-white/15 p-6 rounded-3xl shadow-2xl">
                <div className="relative group overflow-hidden rounded-2xl mb-5">
                  <img
                    src={featuredPizza.image}
                    alt={featuredPizza.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge variant="accent" className="absolute top-3 right-3 shadow-lg">
                    🔥 Deal of the Day
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white">{featuredPizza.name}</h3>
                    <span className="text-2xl font-black text-orange-400">
                      {formatPrice(featuredPizza.prices.medium)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {featuredPizza.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{featuredPizza.rating}</span>
                      <span className="text-stone-500">({featuredPizza.numReviews} reviews)</span>
                    </div>
                    <Button
                      onClick={() => handleQuickAdd(featuredPizza)}
                      variant="default"
                      size="sm"
                      className="rounded-xl shadow-md"
                    >
                      Quick Add +
                    </Button>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          )}
        </div>
      </section>

      {/* Featured Menu Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge variant="default" className="mb-2">
              Artisanal Selection
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Trending Slices & Classics
            </h2>
          </div>
          <Link href="/menu">
            <Button variant="ghost" className="gap-2 text-orange-400 hover:text-orange-300">
              <span>View Full Menu</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-stone-400">Loading menu items from API...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzas.slice(0, 6).map((pizza) => (
              <SpotlightCard key={pizza._id} className="flex flex-col justify-between h-full group">
                <div>
                  <div className="relative overflow-hidden rounded-2xl mb-4 h-48">
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
                    <h3 className="font-bold text-lg text-stone-100 group-hover:text-orange-400 transition-colors">
                      {pizza.name}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-lg bg-stone-900 text-stone-300 border border-white/10 font-mono">
                      {pizza.category}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {pizza.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block">Medium 12"</span>
                    <span className="text-lg font-extrabold text-orange-400">
                      {formatPrice(pizza.prices.medium)}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleQuickAdd(pizza)}
                    variant="default"
                    size="sm"
                    className="rounded-xl"
                  >
                    Add to Order
                  </Button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </section>

      {/* Visual Custom Pizza Banner */}
      <section className="relative rounded-3xl glass-panel p-8 sm:p-12 overflow-hidden border border-orange-500/30">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <Badge variant="accent">Interactive Pizza Customizer</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Craft Your Masterpiece Step-by-Step
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Choose your artisan crust, select house-made sauce, double the cheese, and layer veggies and meats with instant 2D animated visual updates!
            </p>
            <Link href="/builder" className="inline-block pt-2">
              <MagnetButton magnetStrength={0.2}>
                <Button variant="gradient" size="lg" className="rounded-2xl gap-2 shadow-lg shadow-orange-500/30">
                  <Sparkles className="w-5 h-5" />
                  <span>Launch Visual Builder</span>
                </Button>
              </MagnetButton>
            </Link>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-amber-600/30 to-orange-500/20 border-4 border-orange-500/40 flex items-center justify-center shadow-2xl animate-float">
              <div className="w-40 h-40 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/40 shadow-inner">
                <Sparkles className="w-20 h-20 text-orange-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border border-orange-400/20 animate-spin-slow pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
