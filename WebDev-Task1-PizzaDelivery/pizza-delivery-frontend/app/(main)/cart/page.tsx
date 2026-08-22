import Link from "next/link";

const items = [
  { name: "Truffle Mushroom", qty: 1, price: "$22", accent: "from-[#5f4b3d] via-[#c65d38] to-[#f7b267]" },
  { name: "Fire Crust Pepperoni", qty: 2, price: "$48", accent: "from-[#a12121] via-[#ef4444] to-[#fbbf24]" },
  { name: "Sunset Margherita", qty: 1, price: "$19", accent: "from-[#2e8b57] via-[#7bd389] to-[#f0d87a]" },
];

export default function CartPage() {
  const subtotal = 89;
  const delivery = 6.5;
  const total = subtotal + delivery;

  return (
    <div className="space-y-10 pb-10 pt-6">
      <section className="glass-panel rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Cart</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Your order is ready to go.</h1>
          </div>
          <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">3 items</p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.45fr_0.8fr]">
        <div className="space-y-5">
          {items.map((item, index) => (
            <div key={index} className="glass-panel flex items-center gap-4 rounded-[26px] border border-white/10 p-4">
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-4xl`}>
                🍕
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-white">{item.name}</h2>
                    <p className="mt-1 text-sm text-white/55">Qty {item.qty}</p>
                  </div>
                  <p className="text-lg font-black text-[#ffcf86]">{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#1b120f] px-3 py-2 text-sm text-white/75">
                <button className="h-6 w-6 rounded-full bg-white/5">-</button>
                <span>{item.qty}</span>
                <button className="h-6 w-6 rounded-full bg-white/5">+</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Order summary</h2>

          <div className="mt-6 space-y-4 text-sm text-white/70">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>$89.00</span></div>
            <div className="flex items-center justify-between"><span>Delivery</span><span>$6.50</span></div>
            <div className="flex items-center justify-between"><span>Tax</span><span>$0.00</span></div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>$95.50</span>
            </div>
          </div>

          <Link href="/checkout" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:-translate-y-0.5 hover:bg-[#ffc95e]">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
