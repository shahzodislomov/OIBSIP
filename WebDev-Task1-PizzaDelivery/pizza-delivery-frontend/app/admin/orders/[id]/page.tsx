import Link from "next/link";

export default function AdminOrderDetailPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Order management</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">#30214</h1>
          </div>
          <span className="rounded-full bg-[#ffb347]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffcf86]">Preparing</span>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Customer details</h2>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            <p><span className="text-white/45">Name:</span> Maya Johnson</p>
            <p><span className="text-white/45">Address:</span> 781 Maple Street, Apt 9</p>
            <p><span className="text-white/45">Phone:</span> (415) 555-0142</p>
            <p><span className="text-white/45">Delivery notes:</span> Ring bell and leave at door.</p>
          </div>
        </div>

        <aside className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Order items</h2>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            <div className="flex justify-between"><span>Truffle Mushroom</span><span>$22</span></div>
            <div className="flex justify-between"><span>Fire Crust Pepperoni</span><span>$24</span></div>
            <div className="flex justify-between"><span>Sunset Margherita</span><span>$19</span></div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5 text-lg font-black text-white">
            <div className="flex justify-between"><span>Total</span><span>$65</span></div>
          </div>

          <Link href="/admin/orders" className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Back to orders
          </Link>
        </aside>
      </div>
    </div>
  );
}
