"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useRegister } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/apiError";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          router.push("/verify-email");
        },
      }
    );
  };

  return (
    <div className="flex min-h-[72vh] items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-xl rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Join us</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Create your account.</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2 text-sm text-white/70">
            <span>Full name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Maya Johnson"
              className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </label>

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
              placeholder="Create a strong password"
              className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35"
            />
          </label>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {registerMutation.isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        {registerMutation.isError && (
          <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {getApiErrorMessage(registerMutation.error)}
          </div>
        )}

        {registerMutation.isSuccess && (
          <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Registration successful. Please verify your email.
          </div>
        )}

        <div className="mt-6 text-center text-sm text-white/60">
          Already a member? <Link href="/login" className="font-semibold text-[#ffcf86]">Log in</Link>
        </div>
      </div>
    </div>
  );
}
