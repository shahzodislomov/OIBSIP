import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-white/65">{description}</p>
    </div>
  );
}

export function StatsCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-sm text-white/60">{label}</p>
    </div>
  );
}

export function InfoPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#ffb347]/30 bg-[#ffb347]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffcf86]">
      {children}
    </span>
  );
}

export function ProductCard({
  slug,
  name,
  description,
  price,
  tag,
  accent,
}: {
  slug: string;
  name: string;
  description: string;
  price: string;
  tag: string;
  accent: string;
}) {
  return (
    <Link href={`/menu/${slug}`} className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#1a120f] shadow-[0_25px_70px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-1 hover:border-[#ffb347]/40">
      <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${accent}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.38),transparent_35%)]" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
          {tag}
        </div>
        <div className="absolute bottom-4 left-5 text-6xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)]">🍕</div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-white">{name}</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
          </div>
          <span className="text-lg font-black text-[#ffb347]">{price}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.25em] text-white/45">Popular</span>
          <span className="inline-flex rounded-full bg-[#ffb347]/15 px-3 py-1 text-xs font-bold text-[#ffcf86]">Add to cart</span>
        </div>
      </div>
    </Link>
  );
}

export function DetailBlock({ icon, title, value }: { icon: string; title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 text-2xl">{icon}</div>
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{title}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}
