import Link from "next/link";
import { DetailBlock, InfoPill } from "@/components/ui-kit";

const pizza = {
  name: "Truffle Mushroom",
  description:
    "A rich, earth-toned favorite with roasted mushrooms, whipped ricotta, parmesan, and a glossy truffle finish that tastes luxurious from the first bite.",
  price: "$22",
  heat: "Mild",
  cook: "12–15 min",
  size: "12 in",
  ingredients: ["Wild mushrooms", "Ricotta", "Truffle oil", "Parmesan", "Baby arugula"],
};

export default function PizzaDetailPage() {
  return (
    <div className="pb-10 pt-6">
      <div className="glass-panel overflow-hidden rounded-[32px] border border-white/10">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_1.1fr] lg:p-10">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#5f4b3d] via-[#c65d38] to-[#f7b267] p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),transparent_35%)]" />
            <div className="relative flex h-full min-h-[320px] items-center justify-center text-[8rem] animate-float-slow">🍕</div>
          </div>

          <div className="space-y-6">
            <InfoPill>Chef special</InfoPill>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-white/45">Signature pizza</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">{pizza.name}</h1>
            </div>

            <p className="text-lg leading-8 text-white/70">{pizza.description}</p>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-[#ffcf86]">{pizza.price}</span>
              <span className="rounded-full border border-[#ffb347]/35 bg-[#ffb347]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#ffcf86]">{pizza.heat}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <DetailBlock icon="⏱️" title="Cook" value={pizza.cook} />
              <DetailBlock icon="📏" title="Size" value={pizza.size} />
              <DetailBlock icon="🔥" title="Heat" value={pizza.heat} />
            </div>

            <div className="flex flex-wrap gap-3">
              {pizza.ingredients.map((ingredient) => (
                <span key={ingredient} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70">{ingredient}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-[#ffb347] px-6 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
                Add to cart
              </button>
              <Link href="/menu" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Back to menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
