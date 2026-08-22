import Link from "next/link";

export default function AdminCustomerDetailPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Customer</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Maya Johnson</h1>
          </div>
          <span className="rounded-full bg-[#ffb347]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffcf86]">VIP</span>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Profile</h2>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            <p><span className="text-white/45">Email:</span> maya@email.com</p>
            <p><span className="text-white/45">Orders:</span> 12</p>
            <p><span className="text-white/45">Total spend:</span> $421</p>
            <p><span className="text-white/45">Favorite:</span> Truffle Mushroom</p>
          </div>
        </section>

        <aside className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Recent activity</h2>
          <div className="mt-6 space-y-4 text-sm text-white/70">
            {['Ordered 2x Truffle Mushroom', 'Redeemed loyalty reward', 'Used a VIP delivery preference'].map((activity) => (
              <div key={activity} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                {activity}
              </div>
            ))}
          </div>

          <Link href="/admin/customers" className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Back to customers
          </Link>
        </aside>
      </div>
    </div>
  );
}
