'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Flame, ChevronRight, Clock, Award, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { FloatingPizzas } from '@/components/animations/floating-pizzas';
import { Button } from '@/components/ui/button';
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
    showToast(`${pizza.name} Added`, 'Medium size (12") added to your cart.', 'success');
  };

  const featuredPizza = pizzas[0];

  return (
    <div className="relative space-y-16 pb-20 pt-4">
      <FloatingPizzas />

      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl glass-panel p-8 sm:p-12 border border-white/[0.07]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#e05638] text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-[#e05638]" />
              <span>48-Hour Slow Fermented Dough</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Authentic Stone-Fired Artisanal Pizza
              </h1>
              <p className="text-stone-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Hand-tossed daily using San Marzano tomatoes, imported mozzarella, and slow-roasted ingredients cooked at 450°C.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/menu">
                <Button variant="gradient" size="lg" className="rounded-xl gap-2 font-bold px-7 shadow-sm">
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/builder">
                <Button variant="outline" size="lg" className="rounded-xl gap-2 border-white/10 text-stone-200">
                  <span>Custom Pizza Studio</span>
                </Button>
              </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#e05638]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">25 Mins</div>
                  <p className="text-[11px] text-stone-400">Average Delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">4.9 ★</div>
                  <p className="text-[11px] text-stone-400">Customer Rating</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">100%</div>
                  <p className="text-[11px] text-stone-400">Fresh Ingredients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Hero Showcase */}
          {featuredPizza && (
            <div className="relative flex justify-center">
              <SpotlightCard className="w-full max-w-md bg-[#161620]/90 border-white/10 p-6 rounded-3xl shadow-xl">
                <div className="relative overflow-hidden rounded-2xl mb-5 h-64">
                  <img
                    src={featuredPizza.image}
                    alt={featuredPizza.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#161620]/90 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                    Featured Choice
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{featuredPizza.name}</h3>
                    <span className="text-xl font-bold text-[#e05638]">
                      {formatPrice(featuredPizza.prices.medium)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {featuredPizza.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{featuredPizza.rating}</span>
                      <span className="text-stone-400">({featuredPizza.numReviews} reviews)</span>
                    </div>
                    <Button
                      onClick={() => handleQuickAdd(featuredPizza)}
                      variant="default"
                      size="sm"
                      className="rounded-xl font-medium"
                    >
                      Quick Add
                    </Button>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          )}
        </div>
      </section>

      {/* Featured Menu Catalog */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#e05638] uppercase tracking-wider block mb-1">
              Menu Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Signature Oven-Baked Pizzas
            </h2>
          </div>
          <Link href="/menu">
            <Button variant="ghost" className="gap-1.5 text-xs font-semibold text-[#e05638] hover:text-[#c8462b]">
              <span>View All Items</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-stone-400 text-sm">Loading pizza catalog...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzas.slice(0, 6).map((pizza) => (
              <SpotlightCard key={pizza._id} className="flex flex-col justify-between h-full p-5 rounded-2xl bg-[#161620]/80">
                <div>
                  <div className="relative overflow-hidden rounded-xl mb-4 h-48">
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
                    <h3 className="font-bold text-base text-white">
                      {pizza.name}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-white/10 font-mono">
                      {pizza.category}
                    </span>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                    {pizza.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Medium (12")</span>
                    <span className="text-base font-bold text-[#e05638]">
                      {formatPrice(pizza.prices.medium)}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleQuickAdd(pizza)}
                    variant="default"
                    size="sm"
                    className="rounded-xl text-xs"
                  >
                    Add to Cart
                  </Button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
