'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Clock, CheckCircle2, Truck, Flame, ChefHat, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { io } from 'socket.io-client';
import { Badge } from '@/components/ui/badge';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { DecryptedText } from '@/components/animations/decrypted-text';
import { formatPrice } from '@/lib/utils';
import axios from 'axios';

interface OrderDetail {
  _id: string;
  orderNumber: string;
  orderStatus: 'Received' | 'Preparing' | 'Baking' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  paymentMethod: string;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: { street: string; city: string; zipCode: string; phone: string };
  items: Array<{ name: string; size: string; quantity: number; price: number; extraToppings?: string[] }>;
  createdAt: string;
}

const statusSteps = [
  { key: 'Received', label: 'Order Received', icon: PackageCheck, desc: 'Kitchen accepted your order' },
  { key: 'Preparing', label: 'Preparing Ingredients', icon: ChefHat, desc: 'Stretching dough & adding toppings' },
  { key: 'Baking', label: 'Stone-Fired Baking', icon: Flame, desc: 'Baking in 450°C oven' },
  { key: 'Out for Delivery', label: 'Out for Delivery', icon: Truck, desc: 'Rider is on the way to you' },
  { key: 'Delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Enjoy your meal!' },
];

export default function OrderTrackerPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'ord_demo_1';
  const [isMounted, setIsMounted] = useState(false);

  const [order, setOrder] = useState<OrderDetail>({
    _id: orderId,
    orderNumber: 'ORD-888888',
    orderStatus: 'Preparing',
    paymentStatus: 'Paid',
    paymentMethod: 'Razorpay',
    subtotal: 579,
    tax: 29,
    deliveryFee: 0,
    totalAmount: 608,
    deliveryAddress: {
      street: '123 Baker Street',
      city: 'Mumbai',
      zipCode: '400001',
      phone: '+91 9876543210',
    },
    items: [
      { name: 'Truffle Mushroom Gourmet', size: 'medium', quantity: 1, price: 579, extraToppings: ['Ricotta'] },
    ],
    createdAt: '2026-08-22T10:00:00.000Z',
  });

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex((s) => s.key === order.orderStatus);
  };

  useEffect(() => {
    setIsMounted(true);

    // 1. Fetch order details from API
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        if (res.data?.order) {
          setOrder(res.data.order);
        }
      } catch (e) {
        // Fallback
      }
    };
    fetchOrder();

    // 2. Connect Socket.IO for real-time live updates
    const socket = io('http://localhost:5000', {
      reconnectionAttempts: 3,
    });

    socket.emit('joinOrderRoom', orderId);

    socket.on('orderStatusUpdated', (data) => {
      if (data.orderStatus) {
        setOrder((prev) => ({ ...prev, orderStatus: data.orderStatus }));
        if (data.orderStatus === 'Delivered') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    });

    return () => {
      socket.emit('leaveOrderRoom', orderId);
      socket.disconnect();
    };
  }, [orderId]);

  const currentStep = getCurrentStepIndex();

  return (
    <div className="space-y-10 pb-20 pt-6 max-w-4xl mx-auto">
      {/* Tracker Header */}
      <section className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="accent" className="mb-2 gap-1">
            <Clock className="w-3.5 h-3.5" /> Real-time Live Tracking
          </Badge>
          <h1 className="text-3xl font-black text-white">Order {order.orderNumber}</h1>
          <p className="text-xs text-stone-400 mt-1">
            {isMounted ? `Placed at ${new Date(order.createdAt).toLocaleTimeString()}` : 'Live Order Tracking'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={order.orderStatus === 'Delivered' ? 'success' : 'accent'} className="text-sm px-4 py-1.5 font-bold">
            {order.orderStatus}
          </Badge>
        </div>
      </section>

      {/* Real-time Status Progress Timeline */}
      <section className="glass-panel p-8 rounded-3xl border border-white/10 space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white">Live Kitchen & Delivery Status</h2>
          <span className="text-xs text-stone-400 font-mono">
            Status: <DecryptedText text={order.orderStatus} />
          </span>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          {/* Progress Bar Line */}
          <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-stone-800 -z-0">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
              style={{
                width: `${(Math.max(0, currentStep) / (statusSteps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {statusSteps.map((step, idx) => {
            const isCompleted = idx <= currentStep;
            const isCurrent = idx === currentStep;
            const StepIcon = step.icon;

            return (
              <div key={step.key} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center flex-1">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/40 scale-110 ring-4 ring-orange-500/20'
                      : isCompleted
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-stone-900 text-stone-600 border-white/5'
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                </div>

                <div>
                  <h4 className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-stone-500'}`}>
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-stone-400 hidden md:block max-w-[120px] mx-auto mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Order Summary Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <SpotlightCard className="p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-stone-100 border-b border-white/10 pb-2">Items Ordered</h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-xs">
                <div>
                  <p className="font-bold text-white">
                    {item.quantity}x {item.name} ({item.size})
                  </p>
                  {item.extraToppings && item.extraToppings.length > 0 && (
                    <p className="text-[10px] text-stone-400">+ {item.extraToppings.join(', ')}</p>
                  )}
                </div>
                <span className="font-mono text-orange-400 font-bold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Taxes</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-white pt-2 text-sm">
              <span>Total Paid ({order.paymentMethod})</span>
              <span className="text-orange-400">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-stone-100 border-b border-white/10 pb-2">Delivery Destination</h3>
          <div className="text-xs space-y-2 text-stone-300">
            <p className="font-bold text-stone-100">{order.deliveryAddress.street}</p>
            <p>{order.deliveryAddress.city}, {order.deliveryAddress.zipCode}</p>
            <p className="text-stone-400">Phone: {order.deliveryAddress.phone}</p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300 flex items-center gap-2">
            <Truck className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Driver live coordinates synchronized via Socket.IO room <code>order_{orderId}</code>.</span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
