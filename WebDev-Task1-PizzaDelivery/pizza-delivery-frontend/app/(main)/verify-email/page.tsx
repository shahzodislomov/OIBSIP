"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { verifyEmail } from "@/services/auth";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [message, setMessage] = useState("Checking your verification link...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("pending");
      setMessage("We sent a verification email after you registered. Please open the link in your inbox.");
      return;
    }

    const runVerification = async () => {
      try {
        const response = await verifyEmail(token);
        setStatus("success");
        setMessage(response.message || "Your email has been verified successfully.");

        const redirectTimer = setTimeout(() => {
          router.push("/login");
        }, 1800);

        return () => clearTimeout(redirectTimer);
      } catch (error: unknown) {
        setStatus("error");
        setMessage(
          error instanceof Error && "message" in error
            ? String((error as { message?: string }).message)
            : "This verification link is invalid or has expired."
        );
      }
    };

    runVerification();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-[72vh] items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-xl rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Almost there</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Verify your email.</h1>
        </div>

        <div
          className={`rounded-[28px] border p-5 text-center ${
            status === "success"
              ? "border-emerald-500/30 bg-emerald-500/10"
              : status === "error"
                ? "border-red-500/30 bg-red-500/10"
                : "border-[#ffb347]/20 bg-[#ffb347]/8"
          }`}
        >
          <p className="text-lg leading-8 text-white/75">{message}</p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]"
          >
            Continue to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[72vh] items-center justify-center px-4 py-12 text-white/80">Loading verification...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
