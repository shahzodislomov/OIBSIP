'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, User, Pizza, Sparkles, Menu, X, Shield, LogOut, Clock } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MagnetButton } from '@/components/animations/magnet-button';

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleCart, getTotalItems } = useCartStore();
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalCartItems = getTotalItems();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/builder', label: 'Custom Builder', badge: 'Popular' },
    { href: '/orders', label: 'My Orders' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel bg-[#08080d]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300">
            <Pizza className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              PIZZA<span className="text-orange-500">CRAFT</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block -mt-1">
              Artisanal Stone-Fired
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#12111d]/80 p-1.5 rounded-2xl border border-white/10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-orange-500/20 border border-orange-500/30 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {link.badge && (
                  <Badge variant="accent" className="text-[10px] px-1.5 py-0">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Custom Pizza Quick CTA */}
          <Link href="/builder" className="hidden lg:block">
            <MagnetButton magnetStrength={0.2}>
              <Button variant="gradient" size="sm" className="rounded-xl shadow-md">
                <Sparkles className="w-4 h-4 text-amber-200 animate-spin-slow" />
                Build Custom Pizza
              </Button>
            </MagnetButton>
          </Link>

          {/* Cart Trigger Button */}
          <button
            onClick={toggleCart}
            className="relative p-2.5 rounded-xl bg-[#12111d]/90 border border-white/10 hover:border-orange-500/40 text-stone-200 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-orange-500/40 animate-pulse">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* User Account / Profile */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 rounded-xl bg-[#12111d]/90 border border-white/10 hover:border-orange-500/40 text-stone-200 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center border border-orange-500/30">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold max-w-[100px] truncate hidden sm:inline-block">
                    {user.name}
                  </span>
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-panel bg-[#12111d] rounded-2xl p-2 shadow-2xl border border-white/15 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-stone-400 truncate">{user.email}</p>
                    </div>
                    {(user.role === 'admin' || user.isAdmin) && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-400 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-200 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Clock className="w-4 h-4 text-orange-400" />
                      Order History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="rounded-xl">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#12111d] border border-white/10 text-stone-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel bg-[#12111d] border-t border-white/10 px-4 py-4 space-y-2 animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-orange-500 text-white font-semibold'
                  : 'text-stone-300 hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/builder"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg mt-2"
          >
            Build Custom Pizza
          </Link>
        </div>
      )}
    </header>
  );
};
