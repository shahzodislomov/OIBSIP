import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="space-y-10 pb-10 pt-6">
      <section className="glass-panel rounded-[32px] border border-white/10 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Checkout</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Place your order.</h1>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Delivery details</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm text-white/70">
              <span>Full name</span>
              <input defaultValue="Daniel Reed" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none ring-0 placeholder:text-white/35" />
            </label>
            <label className="space-y-2 text-sm text-white/70">
              <span>Phone</span>
              <input defaultValue="(415) 555-0142" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35" />
            </label>
            <label className="space-y-2 text-sm text-white/70 md:col-span-2">
              <span>Street address</span>
              <input defaultValue="781 Maple Street, Apt 9" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35" />
            </label>
            <label className="space-y-2 text-sm text-white/70">
              <span>City</span>
              <input defaultValue="San Francisco" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35" />
            </label>
            <label className="space-y-2 text-sm text-white/70">
              <span>Zip</span>
              <input defaultValue="94103" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35" />
            </label>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-black text-white">Payment</h3>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-[#ffb347]/35 bg-[#ffb347]/10 px-4 py-3 text-sm text-[#ffe0a5]">
                Card ending in 4242 • Exp 09/28
              </div>
              <label className="space-y-2 text-sm text-white/70">
                <span>Delivery notes</span>
                <textarea rows={4} defaultValue="Ring the bell, leave at the front door if no answer." className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35" />
              </label>
            </div>
          </div>
        </div>

        <aside className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Your order</h2>
          <div className="mt-6 space-y-4">
            {[
              ['Truffle Mushroom', '$22'],
              ['Fire Crust Pepperoni', '$48'],
              ['Sunset Margherita', '$19'],
            ].map(([name, price]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-3 py-3 text-sm text-white/65">
                <span>{name}</span>
                <span>{price}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-white/75">
            <div className="flex justify-between"><span>Subtotal</span><span>$89</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>$6.50</span></div>
            <div className="flex justify-between"><span>Service fee</span><span>$4.00</span></div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-lg font-black text-white">
            <span>Total</span>
            <span>$99.50</span>
          </div>

          <Link href="/checkout/success" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            Confirm order
          </Link>
        </aside>
      </div>
    </div>
  );
}
