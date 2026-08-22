import Link from "next/link";
import { ProductCard, SectionHeading } from "@/components/ui-kit";

const favorites = [
  {
    slug: "truffle-mushroom",
    name: "Truffle Mushroom",
    description: "Earthy mushroom richness with slow-roasted garlic and truffle cream.",
    price: "$22",
    tag: "Comfort",
    accent: "from-[#4a342d] via-[#a95c3b] to-[#f7b267]",
  },
  {
    slug: "sunset-margherita",
    name: "Sunset Margherita",
    description: "Burrata, basil oil, and bright tomato notes from the oven.",
    price: "$19",
    tag: "Classic",
    accent: "from-[#2e8b57] via-[#7bd389] to-[#f0d87a]",
  },
  {
    slug: "garden-veg",
    name: "Garden Veggie",
    description: "Plant-forward and fresh with vibrant herbs and seasonal veggies.",
    price: "$21",
    tag: "Fresh",
    accent: "from-[#235e58] via-[#3ab7a7] to-[#d9f99d]",
  },
];

export default function FavoritesPage() {
  return (
    <div className="space-y-10 pb-8 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Saved</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Your favorite slices.</h1>
          </div>
          <Link href="/menu" className="inline-flex items-center justify-center rounded-full border border-[#ffb347]/40 bg-[#ffb347]/10 px-5 py-3 text-sm font-bold text-[#ffcf86] transition hover:bg-[#ffb347]/20">
            Explore the menu
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Collection"
          title="Pizza moments worth repeating"
          description="Your go-to favorites are saved here for easy reorders and the occasional indulgent late-night craving."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((item) => (
            <ProductCard key={item.slug} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
