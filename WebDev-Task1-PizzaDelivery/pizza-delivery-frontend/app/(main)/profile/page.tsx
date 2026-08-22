import Link from "next/link";

const recentOrders = [
  { id: "#30214", date: "Today, 7:42 PM", total: "$42.50", status: "Out for delivery" },
  { id: "#30106", date: "Mon, 3:05 PM", total: "$27.00", status: "Delivered" },
  { id: "#30088", date: "Fri, 8:15 PM", total: "$35.60", status: "Delivered" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-10 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb347] via-[#ff7b54] to-[#ef4444] text-3xl">👩🏽</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#ffb347]">Profile</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-white">Maya Johnson</h1>
            </div>
          </div>

          <Link href="/profile/edit" className="inline-flex items-center justify-center rounded-full border border-[#ffb347]/35 bg-[#ffb347]/10 px-5 py-3 text-sm font-bold text-[#ffcf86] transition hover:bg-[#ffb347]/20">
            Edit profile
          </Link>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <section className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Account overview</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['Favorites', '14 saved'],
              ['Rewards', '2,430 pts'],
              ['Delivery address', 'San Francisco'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
                <p className="mt-3 text-lg font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Recent orders</h2>
          <div className="mt-6 space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-white">{order.id}</p>
                    <p className="mt-1 text-xs text-white/45">{order.date}</p>
                  </div>
                  <span className="rounded-full bg-[#ffb347]/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffcf86]">{order.status}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-white/65">
                  <span>Total</span>
                  <span className="font-bold text-white">{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
