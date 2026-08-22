import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="glass-panel max-w-xl rounded-[32px] border border-white/10 p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Access denied</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">You’re not authorized here.</h1>
        <p className="mt-4 text-lg leading-8 text-white/70">
          This area is reserved for verified staff or customers with the right permissions.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/login" className="rounded-full bg-[#ffb347] px-6 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            Log in
          </Link>
          <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
