'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DollarSign, ShoppingBag, AlertTriangle, Users, Flame, ChevronRight, PackageCheck, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import axios from 'axios';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalUsers: number;
  lowStockCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 48950,
    totalOrders: 142,
    activeOrders: 8,
    completedOrders: 130,
    totalUsers: 95,
    lowStockCount: 2,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([
    {
      _id: 'ord_101',
      orderNumber: 'ORD-982134',
      user: { name: 'Alex Rivera', email: 'alex@example.com' },
      totalAmount: 608,
      orderStatus: 'Preparing',
      paymentStatus: 'Paid',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'ord_100',
      orderNumber: 'ORD-472190',
      user: { name: 'Sarah Connor', email: 'sarah@example.com' },
      totalAmount: 948,
      orderStatus: 'Baking',
      paymentStatus: 'Paid',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer mock_token` },
        });
        if (res.data?.stats) {
          setStats(res.data.stats);
        }
        if (res.data?.recentOrders?.length) {
          setRecentOrders(res.data.recentOrders);
        }
      } catch (e) {
        // Fallback mock
      }
    };
    fetchAdminStats();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/admin/${orderId}/status`, {
        orderStatus: newStatus,
      });
    } catch (e) {}

    setRecentOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  return (
    <div className="space-y-8 pb-20 pt-6">
      {/* Admin Header */}
      <section className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="accent" className="mb-2">
            Control Center
          </Badge>
          <h1 className="text-3xl font-black text-white">Admin Operations Dashboard</h1>
          <p className="text-xs text-stone-400 mt-1">Manage kitchen status, orders, menu & inventory</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/inventory">
            <Button variant="outline" size="sm" className="rounded-xl gap-2">
              <Layers className="w-4 h-4 text-orange-400" />
              Inventory Stock
            </Button>
          </Link>
        </div>
      </section>

      {/* Low Stock Warning Alert Banner */}
      {stats.lowStockCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs text-amber-200 font-semibold">
              Warning: {stats.lowStockCount} ingredient(s) are below minimum threshold!
            </span>
          </div>
          <Link href="/admin/inventory">
            <Button variant="outline" size="sm" className="rounded-xl text-xs">
              Restock Now
            </Button>
          </Link>
        </div>
      )}

      {/* Stats Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SpotlightCard className="p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{formatPrice(stats.totalRevenue)}</div>
          <p className="text-[11px] text-emerald-400 font-medium">All completed & paid orders</p>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase">Active Orders</span>
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-orange-400">{stats.activeOrders}</div>
          <p className="text-[11px] text-stone-400 font-medium">Currently in kitchen / delivery</p>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase">Total Orders</span>
            <ShoppingBag className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{stats.totalOrders}</div>
          <p className="text-[11px] text-stone-400 font-medium">Lifetime order volume</p>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase">Low Stock Alerts</span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-black text-red-400">{stats.lowStockCount}</div>
          <p className="text-[11px] text-stone-400 font-medium">Ingredients needing refill</p>
        </SpotlightCard>
      </div>

      {/* Active Kitchen Orders List */}
      <section className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <h2 className="font-bold text-lg text-white">Live Kitchen Orders</h2>
          <Badge variant="default">{recentOrders.length} Active</Badge>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order._id}
              className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white text-base">{order.orderNumber}</span>
                  <Badge variant="accent">{order.orderStatus}</Badge>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  Customer: <span className="text-stone-200">{order.user?.name || 'Guest'}</span> • Pay:{' '}
                  <span className="text-emerald-400">{order.paymentStatus}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold text-orange-400 mr-4">
                  {formatPrice(order.totalAmount)}
                </span>

                {/* Quick Status Advance buttons */}
                {['Received', 'Preparing', 'Baking', 'Out for Delivery', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(order._id, st)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                      order.orderStatus === st
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
