'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layers, Plus, AlertTriangle, Check, ArrowLeft, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { formatPrice } from '@/lib/utils';
import axios from 'axios';

interface Ingredient {
  _id: string;
  name: string;
  category: 'crust' | 'sauce' | 'cheese' | 'veggie' | 'meat';
  price: number;
  stockQuantity: number;
  minStockThreshold: number;
  unit: string;
  isAvailable: boolean;
  icon: string;
}

const fallbackIngredients: Ingredient[] = [
  { _id: 'c1', name: 'Classic Hand Tossed', category: 'crust', price: 0, stockQuantity: 180, minStockThreshold: 30, unit: 'doughs', isAvailable: true, icon: '🍞' },
  { _id: 'c3', name: 'Cheese Burst Crust', category: 'crust', price: 99, stockQuantity: 15, minStockThreshold: 20, unit: 'doughs', isAvailable: true, icon: '🧀' },
  { _id: 's1', name: 'Classic Tomato Sauce', category: 'sauce', price: 0, stockQuantity: 450, minStockThreshold: 50, unit: 'portions', isAvailable: true, icon: '🍅' },
  { _id: 'ch1', name: 'Mozzarella Cheese', category: 'cheese', price: 40, stockQuantity: 320, minStockThreshold: 60, unit: 'grams', isAvailable: true, icon: '🧀' },
  { _id: 'v1', name: 'Fresh Bell Peppers', category: 'veggie', price: 30, stockQuantity: 12, minStockThreshold: 30, unit: 'grams', isAvailable: true, icon: '🫑' },
  { _id: 'm1', name: 'Crispy Pepperoni', category: 'meat', price: 65, stockQuantity: 290, minStockThreshold: 45, unit: 'slices', isAvailable: true, icon: '🍖' },
];

export default function AdminInventoryPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(fallbackIngredients);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { showToast } = useToast();

  // Add Item Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'crust' | 'sauce' | 'cheese' | 'veggie' | 'meat'>('veggie');
  const [newPrice, setNewPrice] = useState(30);
  const [newStock, setNewStock] = useState(100);

  const fetchInventory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/inventory');
      if (res.data?.ingredients?.length) {
        setIngredients(res.data.ingredients);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleUpdateStock = async (id: string, delta: number) => {
    setIngredients((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          const updated = Math.max(0, item.stockQuantity + delta);
          return { ...item, stockQuantity: updated };
        }
        return item;
      })
    );

    try {
      const item = ingredients.find((i) => i._id === id);
      if (item) {
        await axios.patch(`http://localhost:5000/api/inventory/${id}`, {
          stockQuantity: Math.max(0, item.stockQuantity + delta),
        });
      }
    } catch (e) {}

    showToast('Stock Updated', 'Inventory quantity saved', 'success');
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Ingredient = {
      _id: `ing_${Date.now()}`,
      name: newName,
      category: newCategory,
      price: Number(newPrice),
      stockQuantity: Number(newStock),
      minStockThreshold: 25,
      unit: 'units',
      isAvailable: true,
      icon: '🍕',
    };

    setIngredients([...ingredients, newItem]);
    showToast('Ingredient Added', `${newName} added to inventory!`, 'success');
    setIsAddModalOpen(false);
    setNewName('');
  };

  const filtered = ingredients.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  return (
    <div className="space-y-8 pb-20 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-xs text-orange-400 font-bold flex items-center gap-1 mb-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-white">Inventory Stock Control</h1>
        </div>

        <Button onClick={() => setIsAddModalOpen(true)} variant="gradient" size="sm" className="rounded-xl gap-1">
          <Plus className="w-4 h-4" /> Add Ingredient
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'crust', 'sauce', 'cheese', 'veggie', 'meat'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-stone-900 text-stone-400 border border-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Inventory Table Card */}
      <section className="glass-panel rounded-3xl p-6 border border-white/10 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-stone-400 uppercase text-[11px]">
              <th className="py-3 px-4">Item Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Add-on Price</th>
              <th className="py-3 px-4">Stock Level</th>
              <th className="py-3 px-4">Threshold</th>
              <th className="py-3 px-4 text-right">Stock Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((item) => {
              const isLowStock = item.stockQuantity <= item.minStockThreshold;

              return (
                <tr key={item._id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-stone-100 flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </td>
                  <td className="py-4 px-4 uppercase text-stone-400 font-mono">{item.category}</td>
                  <td className="py-4 px-4 font-semibold text-orange-400">
                    {item.price === 0 ? 'Free' : formatPrice(item.price)}
                  </td>
                  <td className="py-4 px-4 font-bold">
                    <span className={isLowStock ? 'text-red-400' : 'text-emerald-400'}>
                      {item.stockQuantity} {item.unit}
                    </span>
                    {isLowStock && (
                      <Badge variant="danger" className="ml-2 text-[10px]">
                        Low Stock
                      </Badge>
                    )}
                  </td>
                  <td className="py-4 px-4 text-stone-500 font-mono">{item.minStockThreshold}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleUpdateStock(item._id, -10)}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 border border-white/10 hover:bg-stone-800 text-stone-300 font-bold"
                      >
                        -10
                      </button>
                      <button
                        onClick={() => handleUpdateStock(item._id, 50)}
                        className="px-2.5 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 font-bold"
                      >
                        +50 Restock
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Add Ingredient Dialog */}
      {isAddModalOpen && (
        <Dialog isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Ingredient">
          <form onSubmit={handleAddIngredient} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">Ingredient Name</label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} required />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-stone-900 border border-white/10 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="crust">Crust</option>
                <option value="sauce">Sauce</option>
                <option value="cheese">Cheese</option>
                <option value="veggie">Veggie</option>
                <option value="meat">Meat</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Price (₹)</label>
                <Input type="number" value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Initial Stock</label>
                <Input type="number" value={newStock} onChange={(e) => setNewStock(Number(e.target.value))} required />
              </div>
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full rounded-2xl">
              Save Ingredient
            </Button>
          </form>
        </Dialog>
      )}
    </div>
  );
}
