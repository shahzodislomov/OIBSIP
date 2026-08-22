import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[72vh] items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-lg rounded-[32px] border border-white/10 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Reset</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Forgot your password?</h1>
        <p className="mt-4 text-base leading-7 text-white/70">
          Enter the email address linked to your account and we’ll send a reset link shortly.
        </p>

        <form className="mt-8 space-y-5">
          <label className="block space-y-2 text-sm text-white/70">
            <span>Email address</span>
            <input type="email" defaultValue="maya@email.com" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>

          <button className="w-full rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            Send reset link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/60">
          Back to <Link href="/login" className="font-semibold text-[#ffcf86]">login</Link>
        </div>
      </div>
    </div>
  );
}
