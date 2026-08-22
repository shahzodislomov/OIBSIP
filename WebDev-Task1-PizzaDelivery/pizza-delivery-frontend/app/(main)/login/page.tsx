"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/apiError";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  return (
    <div className="flex min-h-[72vh] items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-xl rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Welcome back</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Log in to Slice Society.</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2 text-sm text-white/70">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </label>

          <label className="block space-y-2 text-sm text-white/70">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </label>

          <div className="flex items-center justify-between text-sm text-white/60">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="rounded border-white/10 bg-[#1a120f]" />
              Remember me
            </label>
            <Link href="/forgot-password" className="font-semibold text-[#ffcf86] hover:text-[#ffdca1]">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </form>

        {loginMutation.isError && (
          <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {getApiErrorMessage(loginMutation.error)}
          </div>
        )}

        {loginMutation.isSuccess && (
          <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Logged in successfully.
          </div>
        )}

        <div className="mt-6 text-center text-sm text-white/60">
          New to Slice Society? <Link href="/register" className="font-semibold text-[#ffcf86]">Create an account</Link>
        </div>
      </div>
    </div>
  );
}