'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Clock, ChevronRight, RefreshCw, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { formatPrice, formatDate } from '@/lib/utils';
import axios from 'axios';

interface OrderSummary {
  _id: string;
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  itemsCount: number;
  createdAt: string;
}

const fallbackOrders: OrderSummary[] = [
  {
    _id: 'ord_101',
    orderNumber: 'ORD-982134',
    orderStatus: 'Preparing',
    paymentStatus: 'Paid',
    totalAmount: 608,
    itemsCount: 1,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'ord_100',
    orderNumber: 'ORD-472190',
    orderStatus: 'Delivered',
    paymentStatus: 'Paid',
    totalAmount: 948,
    itemsCount: 2,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/my-orders');
        if (res.data?.orders?.length) {
          setOrders(
            res.data.orders.map((o: any) => ({
              _id: o._id,
              orderNumber: o.orderNumber,
              orderStatus: o.orderStatus,
              paymentStatus: o.paymentStatus,
              totalAmount: o.totalAmount,
              itemsCount: o.items?.length || 1,
              createdAt: o.createdAt,
            }))
          );
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-8 pb-20 pt-6 max-w-4xl mx-auto">
      <div>
        <Badge variant="accent" className="mb-2">
          History
        </Badge>
        <h1 className="text-3xl font-black text-white">Your Orders</h1>
        <p className="text-xs text-stone-400 mt-1">Track active deliveries or reorder past favorites</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isDelivered = order.orderStatus === 'Delivered';
          const isCancelled = order.orderStatus === 'Cancelled';

          return (
            <SpotlightCard
              key={order._id}
              className="p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-lg text-white">{order.orderNumber}</span>
                  <Badge
                    variant={
                      isDelivered ? 'success' : isCancelled ? 'danger' : 'default'
                    }
                  >
                    {order.orderStatus}
                  </Badge>
                </div>
                <p className="text-xs text-stone-400">
                  Placed on {formatDate(order.createdAt)} • {order.itemsCount} item(s)
                </p>
                <p className="text-sm font-extrabold text-orange-400 mt-1">
                  {formatPrice(order.totalAmount)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link href={`/orders/${order._id}`}>
                  <Button variant="outline" size="sm" className="rounded-xl gap-1">
                    <span>View Tracker</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
