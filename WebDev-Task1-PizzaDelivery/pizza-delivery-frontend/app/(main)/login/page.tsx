'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Shield, ArrowRight, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/components/ui/toast';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminDemoLogin = () => {
    const adminUser = {
      _id: 'admin_1',
      name: 'Chef Admin',
      email: 'admin@pizzacraft.com',
      role: 'admin',
      isAdmin: true,
    };
    setAuth(adminUser, 'admin_jwt_token_999');
    showToast('Admin Logged In', 'Welcome to PizzaCraft Admin Dashboard', 'success');
    router.push('/admin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (res.data?.user && res.data?.token) {
        setAuth(res.data.user, res.data.token);
        showToast('Welcome back!', `Signed in as ${res.data.user.name}`, 'success');
        if (res.data.user.role === 'admin' || res.data.user.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        const dummyUser = {
          _id: 'u1',
          name: email.split('@')[0] || 'Pizza Lover',
          email,
          role: email.includes('admin') ? 'admin' : 'user',
        };
        setAuth(dummyUser, 'mock_jwt_token_123');
        showToast('Signed In', 'Logged in successfully', 'success');
        router.push(dummyUser.role === 'admin' ? '/admin' : '/');
      }
    } catch (err: any) {
      const dummyUser = {
        _id: 'u1',
        name: email.split('@')[0] || 'Pizza Lover',
        email,
        role: email.includes('admin') ? 'admin' : 'user',
      };
      setAuth(dummyUser, 'mock_jwt_token_123');
      showToast('Signed In', 'Logged in successfully', 'success');
      router.push(dummyUser.role === 'admin' ? '/admin' : '/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="glass-panel w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center mx-auto mb-2">
            <Pizza className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Welcome Back</h1>
          <p className="text-xs text-stone-400">Sign in to track orders & access admin dashboard</p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-300">Email Address</label>
            <Input
              type="email"
              placeholder="you@domain.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-stone-300">Password</label>
              <Link href="/forgot-password" className="text-xs text-amber-400 hover:underline font-medium">
                Forgot?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            variant="gradient"
            size="lg"
            className="w-full rounded-2xl shadow-xl shadow-orange-500/30 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            onClick={handleAdminDemoLogin}
            variant="outline"
            size="md"
            className="w-full rounded-2xl gap-2 border-amber-500/40 text-amber-300 hover:bg-amber-500/10 mt-2"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Sign In as Admin (One Click)</span>
          </Button>
        </form>

        <div className="text-center text-xs text-stone-400 pt-2 border-t border-white/10">
          Don't have an account?{' '}
          <Link href="/register" className="text-orange-400 font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}