import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="glass-panel max-w-2xl rounded-[32px] border border-[#ffb347]/30 p-8 text-center shadow-[0_25px_80px_rgba(255,179,71,0.2)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb347] via-[#ff7b54] to-[#ef4444] text-4xl shadow-[0_0_30px_rgba(255,146,86,0.5)]">
          ✓
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Order placed</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Pizza is on the way.</h1>
        <p className="mt-4 text-lg leading-8 text-white/70">
          Your order has been confirmed and the kitchen is firing it up. Expect it in about 35–40 minutes.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Order</p>
            <p className="mt-3 text-lg font-black text-white">#30214</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">ETA</p>
            <p className="mt-3 text-lg font-black text-white">35 min</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Driver</p>
            <p className="mt-3 text-lg font-black text-white">Nina K.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/orders" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-white/20 hover:bg-white/10">
            Track order
          </Link>
          <Link href="/menu" className="rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            Order again
          </Link>
        </div>
      </div>
    </div>
  );
}
