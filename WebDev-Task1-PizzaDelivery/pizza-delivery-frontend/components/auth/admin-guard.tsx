'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { showToast } = useToast();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isAdmin = user && (user.role === 'admin' || user.isAdmin);

    if (!isAuthenticated || !isAdmin) {
      setAuthorized(false);
      setChecking(false);
      showToast('Access Denied 🔒', 'Admin authorization is required to access this portal.', 'error');
    } else {
      setAuthorized(true);
      setChecking(false);
    }
  }, [user, isAuthenticated, router, showToast]);

  if (checking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center animate-pulse mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-stone-300">Verifying Admin Permissions...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="glass-panel w-full max-w-md rounded-3xl p-8 border border-red-500/30 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-red-500/20">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Admin Access Restricted</h1>
            <p className="text-xs text-stone-300 leading-relaxed">
              You must be logged in with an administrator account to view kitchen orders, revenue analytics, and inventory management.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={() => router.push('/login')}
              variant="gradient"
              size="lg"
              className="w-full rounded-2xl gap-2 font-bold shadow-xl shadow-orange-500/30"
            >
              <span>Sign In as Admin</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => router.push('/')}
              variant="outline"
              size="md"
              className="w-full rounded-2xl text-stone-300"
            >
              Return to Storefront
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
