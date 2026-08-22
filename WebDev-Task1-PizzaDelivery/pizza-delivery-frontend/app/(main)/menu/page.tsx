import Link from "next/link";
import { InfoPill, ProductCard, SectionHeading } from "@/components/ui-kit";

const featuredPizzas = [
  {
    slug: "truffle-mushroom",
    name: "Truffle Mushroom",
    description: "Wild mushrooms, truffle cream, fontina, thyme, and a whisper of black pepper.",
    price: "$22",
    tag: "Chef pick",
    accent: "from-[#5f4b3d] via-[#c65d38] to-[#f7b267]",
  },
  {
    slug: "sunset-margherita",
    name: "Sunset Margherita",
    description: "San Marzano tomato, burrata, basil oil, and a crisp stone-fired crust.",
    price: "$19",
    tag: "Classic",
    accent: "from-[#2e8b57] via-[#7bd389] to-[#f0d87a]",
  },
  {
    slug: "fire-crust-pepperoni",
    name: "Fire Crust Pepperoni",
    description: "Double pepperoni, chilli honey, mozzarella, and smoky paprika finish.",
    price: "$24",
    tag: "Hot",
    accent: "from-[#a12121] via-[#ef4444] to-[#fbbf24]",
  },
  {
    slug: "garden-veg",
    name: "Garden Veggie",
    description: "Roasted peppers, olives, red onions, basil pesto, and parmesan dusting.",
    price: "$21",
    tag: "Fresh",
    accent: "from-[#235e58] via-[#3ab7a7] to-[#d9f99d]",
  },
];

export default function MenuPage() {
  return (
    <div className="space-y-12 pb-10 pt-6">
      <section className="glass-panel page-shell animate-float-up overflow-hidden rounded-[32px] border border-[#ffb347]/15 px-6 py-9 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <InfoPill>Curated menu</InfoPill>
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Crafted for slow evenings and big cravings.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-white/70">
                Thin crust, generous toppings, and deeply satisfying flavors from the oven to your door.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/70">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Stone-fired</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Gluten-aware</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Plant-based</span>
            </div>
          </div>

          <div className="animate-float-slow rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,#ffb347,#ef4444)] p-6 shadow-[0_30px_80px_rgba(239,68,68,0.38)]">
            <div className="rounded-[24px] bg-[#1d120f]/70 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Tonight’s special</span>
                <span className="rounded-full bg-[#ffb347]/15 px-2 py-1 text-[#ffcf86]">40 min</span>
              </div>
              <div className="mt-8 text-7xl text-center">🍕</div>
              <div className="mt-8 space-y-2">
                <p className="text-2xl font-black text-white">Crispy Ember</p>
                <p className="text-sm leading-6 text-white/70">Basil, chili oil, roasted tomato jam, and mozzarella in a charred crust finish.</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-black text-[#ffe0a5]">$26</span>
                <Link href="/menu/fire-crust-pepperoni" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1d120f] transition hover:scale-[1.02]">
                  Order now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Favorites"
          title="Loved by regulars, worth the detour."
          description="Every pizza is built with intentional ingredients, slow proofed dough, and just enough heat to keep things memorable."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredPizzas.map((pizza) => (
            <ProductCard key={pizza.slug} {...pizza} />
          ))}
        </div>
      </section>
    </div>
  );
}
