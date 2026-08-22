import Link from "next/link";

export default function OrderDetailPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Order</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">#30214</h1>
          </div>
          <span className="rounded-full bg-[#ffb347]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffcf86]">Out for delivery</span>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Delivery timeline</h2>
          <div className="mt-6 space-y-5">
            {[
              ['Order confirmed', '7:42 PM'],
              ['Kitchen fired up', '7:46 PM'],
              ['On the road', '8:12 PM'],
              ['Arriving soon', '8:25 PM'],
            ].map(([step, time], idx) => (
              <div key={step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`h-4 w-4 rounded-full ${idx === 3 ? 'bg-[#ffb347]' : 'bg-white/30'}`} />
                  {idx < 3 && <div className="mt-2 h-14 w-px bg-white/10" />}
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-lg font-bold text-white">{step}</p>
                  <p className="mt-1 text-sm text-white/55">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Summary</h2>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            <div className="flex justify-between"><span>Truffle Mushroom</span><span>$22</span></div>
            <div className="flex justify-between"><span>Fire Crust Pepperoni</span><span>$24</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>$6.50</span></div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5 text-lg font-black text-white">
            <div className="flex justify-between"><span>Total</span><span>$52.50</span></div>
          </div>

          <Link href="/orders" className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Return to orders
          </Link>
        </aside>
      </div>
    </div>
  );
}
