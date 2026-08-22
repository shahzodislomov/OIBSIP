import Link from "next/link";
import { ProductCard, SectionHeading } from "@/components/ui-kit";

const searchResults = [
  {
    slug: "sunset-margherita",
    name: "Sunset Margherita",
    description: "Fresh basil, creamy burrata, and glowing tomato sauce.",
    price: "$19",
    tag: "Best seller",
    accent: "from-[#2e8b57] via-[#7bd389] to-[#f0d87a]",
  },
  {
    slug: "garden-veg",
    name: "Garden Veggie",
    description: "A bright mix of peppers, greens, olives, and parmesan.",
    price: "$21",
    tag: "Fresh",
    accent: "from-[#235e58] via-[#3ab7a7] to-[#d9f99d]",
  },
  {
    slug: "fire-crust-pepperoni",
    name: "Fire Crust Pepperoni",
    description: "Fiery, savory, and layered with chili honey brilliance.",
    price: "$24",
    tag: "Hot",
    accent: "from-[#a12121] via-[#ef4444] to-[#fbbf24]",
  },
  {
    slug: "truffle-mushroom",
    name: "Truffle Mushroom",
    description: "Umami-rich mushrooms with earthy truffle and cheesey depth.",
    price: "$22",
    tag: "Chef pick",
    accent: "from-[#5f4b3d] via-[#c65d38] to-[#f7b267]",
  },
];

export default function SearchPage() {
  return (
    <div className="space-y-10 pb-8 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffb347]">Discover</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Find your perfect pizza.</h1>
          </div>

          <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-white/10 bg-[#18110e] px-4 py-3 shadow-inner shadow-black/20">
            <span className="text-xl">🔎</span>
            <input
              value="pepperoni, vegan, margherita"
              readOnly
              className="w-full bg-transparent text-sm text-white/75 outline-none placeholder:text-white/35"
            />
            <Link href="/menu" className="rounded-full bg-[#ffb347] px-4 py-2 text-sm font-bold text-[#1b120e]">
              Search
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Results"
          title="Matches for your cravings"
          description="A quick browse across our most popular slices, chef specials, and bright fresh favorites."
        />

        <div className="flex flex-wrap gap-3">
          {['All', 'Classic', 'Spicy', 'Veggie', 'Gourmet', 'Late-night'].map((filter) => (
            <button key={filter} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${filter === 'All' ? 'border-[#ffb347]/50 bg-[#ffb347]/15 text-[#ffe0a5]' : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {searchResults.map((item) => (
            <ProductCard key={item.slug} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
