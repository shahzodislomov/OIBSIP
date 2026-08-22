'use client';

import React from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { Pizza } from 'lucide-react';

export function SiteShell({ children, variant }: { children: React.ReactNode; variant?: 'main' | 'admin' }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        {children}
      </main>

      <footer className="border-t border-white/10 glass-panel bg-stone-950/90 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                <Pizza className="w-5 h-5" />
              </div>
              <span className="font-black text-white text-lg tracking-tight">PIZZACRAFT</span>
            </div>
            <p className="text-xs leading-relaxed text-stone-400">
              Artisanal stone-fired pizzas crafted with 48-hour fermented dough and small-batch house marinara.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs text-stone-200 uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Home Storefront</Link></li>
              <li><Link href="/menu" className="hover:text-orange-400 transition-colors">Full Menu</Link></li>
              <li><Link href="/builder" className="hover:text-orange-400 transition-colors">Custom Pizza Builder</Link></li>
              <li><Link href="/orders" className="hover:text-orange-400 transition-colors">Live Order History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-stone-200 uppercase tracking-wider mb-3">Customer Support</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/profile" className="hover:text-orange-400 transition-colors">Account Settings</Link></li>
              <li><Link href="/checkout" className="hover:text-orange-400 transition-colors">Checkout & Delivery</Link></li>
              <li><Link href="/login" className="hover:text-orange-400 transition-colors">Sign In / Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-stone-200 uppercase tracking-wider mb-3">Opening Hours</h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>Mon - Thu: 11:00 AM - 11:00 PM</li>
              <li>Fri - Sat: 11:00 AM - 01:00 AM (Late Night)</li>
              <li>Sun: 12:00 PM - 10:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} PizzaCraft Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <span className="text-orange-500">🔥</span> for Oasis Infobyte Internship
          </p>
        </div>
      </footer>
    </div>
  );
}
