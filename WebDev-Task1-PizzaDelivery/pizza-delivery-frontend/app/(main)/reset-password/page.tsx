'use client';

export const dynamic = 'force-dynamic';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { resetPassword } from '@/services/auth';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your entries.');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({ token, password });
      setIsSuccess(true);
      showToast('Password Updated! 🎉', 'Your password has been reset successfully.', 'success');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Password reset token is invalid or has expired.';
      setErrorMsg(msg);
      showToast('Error', msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="glass-panel w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-orange-500/10">
            {isSuccess ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-orange-400" />
            )}
          </div>
          <Badge variant={isSuccess ? 'success' : 'accent'} className="mb-1">
            {isSuccess ? 'Password Reset Complete' : 'Security Credential'}
          </Badge>
          <h1 className="text-2xl font-black text-white">Set New Password</h1>
          <p className="text-xs text-stone-300 leading-relaxed">
            Please enter your new secure password below to complete account recovery.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="space-y-4 text-center pt-2">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed space-y-2">
              <p className="font-bold text-emerald-300">Credentials Updated Successfully!</p>
              <p>You can now sign in with your new password.</p>
            </div>

            <Link href="/login" className="block w-full">
              <Button variant="gradient" size="lg" className="w-full rounded-2xl font-bold gap-2">
                <span>Proceed to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">New Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">Confirm New Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center text-xs text-stone-400 pt-3 border-t border-white/10">
              <Link href="/login" className="text-orange-400 font-bold hover:underline">
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center text-white py-12">Loading password reset...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
