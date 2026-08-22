'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, KeyRound, CheckCircle2, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { forgotPassword } from '@/services/auth';

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      await forgotPassword(email);
      setIsSent(true);
      showToast('Reset Link Sent! 📧', 'Please check your inbox to reset your password.', 'success');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to send reset link. Please check the email address.';
      setErrorMsg(msg);
      showToast('Notice', msg, 'info');
      setIsSent(true); // Fallback notice display
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="glass-panel w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-500/10">
            {isSent ? <CheckCircle2 className="w-7 h-7 text-emerald-400" /> : <KeyRound className="w-7 h-7" />}
          </div>
          <Badge variant="accent" className="mb-1">
            Account Recovery
          </Badge>
          <h1 className="text-2xl font-black text-white">Forgot Password?</h1>
          <p className="text-xs text-stone-300 leading-relaxed">
            Enter your registered email address and we'll send you a password reset link.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {isSent ? (
          <div className="space-y-4 text-center pt-2">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed space-y-2">
              <p className="font-bold text-emerald-300">Reset Email Dispatched! 📬</p>
              <p>
                We've sent a password reset link to <strong className="text-white">{email}</strong>.
              </p>
              <p className="text-[11px] text-stone-400">
                (During development, the reset link is also printed directly to the backend terminal console).
              </p>
            </div>

            <Link href="/login" className="block w-full">
              <Button variant="gradient" size="lg" className="w-full rounded-2xl font-bold">
                Return to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">Your Email Address</label>
              <Input
                type="email"
                placeholder="you@domain.com"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              variant="gradient"
              size="lg"
              className="w-full rounded-2xl shadow-xl shadow-orange-500/30 mt-2 font-bold"
            >
              <span>Send Reset Link</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center text-xs text-stone-400 pt-3 border-t border-white/10">
              Remembered your password?{' '}
              <Link href="/login" className="text-orange-400 font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
