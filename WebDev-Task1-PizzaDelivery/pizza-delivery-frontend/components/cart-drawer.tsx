'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, getSubtotal } = useCartStore();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const tax = Math.round(subtotal * 0.05);
  const freeDeliveryThreshold = 499;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 49;
  const total = subtotal + tax + deliveryFee;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => setCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel bg-stone-950/95 border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-100">Your Cart</h2>
                <p className="text-xs text-stone-400">{items.length} item(s) selected</p>
              </div>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          {subtotal > 0 && (
            <div className="px-6 py-3 bg-stone-900/60 border-b border-white/5">
              <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                <span className="text-stone-300">
                  {subtotal >= freeDeliveryThreshold ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Free Delivery unlocked!
                    </span>
                  ) : (
                    <>Add {formatPrice(freeDeliveryThreshold - subtotal)} more for <strong className="text-amber-400">Free Delivery</strong></>
                  )}
                </span>
                <span className="text-stone-400 font-mono">{Math.round(progressToFreeDelivery)}%</span>
              </div>
              <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-stone-900 border border-white/10 flex items-center justify-center mb-4 text-4xl">
                  🍕
                </div>
                <h3 className="text-lg font-bold text-stone-200">Your cart is empty</h3>
                <p className="text-xs text-stone-400 max-w-xs mt-1 mb-6">
                  Craving freshly baked artisanal pizza? Explore our menu or craft your custom masterpiece!
                </p>
                <Link href="/menu" onClick={() => setCartOpen(false)}>
                  <Button variant="gradient" size="md">
                    Explore Menu
                  </Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-stone-900/70 border border-white/10 flex gap-4 transition-all hover:border-orange-500/30"
                >
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591'}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-stone-100 text-sm truncate">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-400 capitalize mt-0.5">
                        {item.size} • {item.crust || 'Hand Tossed'}
                      </p>
                      {item.extraToppings && item.extraToppings.length > 0 && (
                        <p className="text-[11px] text-amber-400/90 truncate mt-0.5">
                          + {item.extraToppings.join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="font-extrabold text-orange-400 text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-stone-950 px-2 py-1 rounded-xl border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-stone-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-stone-100 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-stone-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-stone-950/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="text-stone-200">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>GST & Taxes (5%)</span>
                  <span className="text-stone-200">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-400 font-semibold' : 'text-stone-200'}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-orange-400 text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout" onClick={() => setCartOpen(false)} className="block w-full">
                <Button variant="gradient" size="lg" className="w-full gap-2 shadow-xl shadow-orange-500/30">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
