'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, User, Pizza, Menu, X, Shield, LogOut, Clock, Sparkles } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';

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
    { href: '/builder', label: 'Custom Builder' },
    { href: '/orders', label: 'My Orders' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#0d0d12]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#e05638] flex items-center justify-center shadow-sm group-hover:bg-[#c8462b] transition-colors">
            <Pizza className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
              PizzaCraft
            </span>
            <span className="text-[10px] text-stone-400 block -mt-0.5 font-medium">
              Stone-Fired Delivery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#161620] px-3 py-1.5 rounded-full border border-white/[0.06]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-white bg-[#e05638] shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Trigger Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/builder" className="hidden lg:block">
            <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5 border-white/10 text-stone-200 hover:text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#e05638]" />
              <span>Build Pizza</span>
            </Button>
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative p-2.5 rounded-xl bg-[#161620] border border-white/[0.07] hover:border-white/20 text-stone-200 transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-stone-300" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#e05638] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
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
                  className="flex items-center gap-2.5 p-1.5 pl-3 rounded-xl bg-[#161620] border border-white/[0.07] hover:border-white/20 text-stone-200 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#e05638]/20 text-[#e05638] font-bold text-xs flex items-center justify-center border border-[#e05638]/30">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-medium max-w-[100px] truncate hidden sm:inline-block">
                    {user.name}
                  </span>
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 glass-panel bg-[#161620] rounded-2xl p-2 shadow-2xl border border-white/10 z-50">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                    </div>
                    {(user.role === 'admin' || user.isAdmin) && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-400 hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-200 hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      Order History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="rounded-xl text-xs">
                  <User className="w-3.5 h-3.5" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#161620] border border-white/10 text-stone-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel bg-[#161620] border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[#e05638] text-white'
                  : 'text-stone-300 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/builder"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-2.5 bg-[#e05638] text-white text-xs font-bold rounded-xl shadow-sm mt-2"
          >
            Build Custom Pizza
          </Link>
        </div>
      )}
    </header>
  );
};
