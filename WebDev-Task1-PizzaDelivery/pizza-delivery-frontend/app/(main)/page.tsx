import Link from "next/link";
import { InfoPill, ProductCard, SectionHeading, StatsCard } from "@/components/ui-kit";

const heroPizzas = [
  {
    slug: "sunset-margherita",
    name: "Sunset Margherita",
    description: "Burrata, basil, and tomato finish with a golden stone-fired crust.",
    price: "$19",
    tag: "Best seller",
    accent: "from-[#2e8b57] via-[#7bd389] to-[#f0d87a]",
  },
  {
    slug: "truffle-mushroom",
    name: "Truffle Mushroom",
    description: "Creamy, earthy, and insanely savory with thyme and garlic notes.",
    price: "$22",
    tag: "Chef pick",
    accent: "from-[#5f4b3d] via-[#c65d38] to-[#f7b267]",
  },
  {
    slug: "fire-crust-pepperoni",
    name: "Fire Crust Pepperoni",
    description: "Spicy honey, double pepperoni, and all the smoky comfort you crave.",
    price: "$24",
    tag: "Hot",
    accent: "from-[#a12121] via-[#ef4444] to-[#fbbf24]",
  },
];

const highlights = [
  { value: "12 min", label: "Avg. delivery" },
  { value: "4.9/5", label: "Guest rating" },
  { value: "1.2k", label: "Orders this week" },
  { value: "24/7", label: "Kitchen" },
];

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16 pt-4">
      <section className="glass-panel page-shell animate-float-up overflow-hidden rounded-[34px] border border-[#ffb347]/15 px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <InfoPill>Fresh from the oven</InfoPill>
            <div className="space-y-4">
              <h1 className="text-shadow-soft text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Pizza that feels like a weekend reward.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-white/70">
                Slow-fired crust, bold sauces, and a menu made for nights when only something warm, cheesy, and unforgettable will do.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/menu" className="inline-flex items-center justify-center rounded-full bg-[#ffb347] px-6 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:-translate-y-0.5 hover:bg-[#ffc95e]">
                Order now
              </Link>
              <Link href="/search" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Browse menu
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {highlights.map((item) => (
                <StatsCard key={item.label} value={item.value} label={item.label} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="animate-float-slow absolute -left-6 top-10 h-40 w-40 rounded-full bg-[#ffb347]/25 blur-3xl" />
            <div className="animate-float-slow absolute -bottom-10 right-0 h-52 w-52 rounded-full bg-[#ef4444]/20 blur-3xl" />

            <div className="relative rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,179,71,0.18),rgba(27,18,15,0.78))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
              <div className="rounded-[28px] border border-white/10 bg-[#1d120f]/75 p-5">
                <div className="flex items-center justify-between text-sm text-white/75">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Live kitchen</span>
                  <span className="text-[#ffcf86]">🔥 Hot</span>
                </div>

                <div className="mt-8 text-center text-8xl drop-shadow-[0_12px_25px_rgba(0,0,0,0.25)]">🍕</div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/45">Featured</p>
                      <h2 className="mt-1 text-2xl font-black">Ember Supreme</h2>
                    </div>
                    <span className="text-2xl font-black text-[#ffcf86]">$26</span>
                  </div>
                  <p className="text-sm leading-6 text-white/65">Pepperoni, smashed tomato, basil, and a honey-chile finish that lingers just right.</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white/65">
                    <span>⭐ 4.9</span>
                    <span>•</span>
                    <span>420 reviews</span>
                  </div>
                  <Link href="/menu/fire-crust-pepperoni" className="rounded-full bg-[#ffb347] px-4 py-2 text-sm font-bold text-[#1b120e]">
                    Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Signature picks"
          title="The kind of pizza you order twice."
          description="Our favorite slices balance richness, freshness, and a little drama so every bite feels like a small celebration."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {heroPizzas.map((pizza) => (
            <ProductCard key={pizza.slug} {...pizza} />
          ))}
        </div>
      </section>
    </div>
  );
}
