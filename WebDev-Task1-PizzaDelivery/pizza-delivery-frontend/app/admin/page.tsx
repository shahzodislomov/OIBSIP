import Link from "next/link";

const stats = [
  { label: "Revenue", value: "$36.4k", delta: "+14.2%" },
  { label: "Orders", value: "1,284", delta: "+8.1%" },
  { label: "Avg. ticket", value: "$31.80", delta: "+3.4%" },
  { label: "Repeat customers", value: "68%", delta: "+6.0%" },
];

const recentOrders = [
  { id: "#30214", customer: "Maya Johnson", total: "$42.50", status: "Preparing" },
  { id: "#30215", customer: "Leo Grant", total: "$31.50", status: "On route" },
  { id: "#30216", customer: "Nina Tran", total: "$58.90", status: "Completed" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10 pb-8 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Operations</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Dashboard overview</h1>
          </div>
          <Link href="/admin/products/new" className="inline-flex items-center justify-center rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            + Add product
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-panel rounded-[26px] border border-white/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">{stat.label}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <span className="rounded-full bg-[#ffb347]/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffcf86]">{stat.delta}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Recent orders</h2>
          <div className="mt-6 space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-lg font-bold text-white">{order.customer}</p>
                  <p className="mt-1 text-sm text-white/50">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-[#ffcf86]">{order.total}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="glass-panel rounded-[30px] border border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">Quick actions</h2>
          <div className="mt-6 space-y-3">
            {[
              ['Manage menu', '/admin/products'],
              ['Review orders', '/admin/orders'],
              ['Customer list', '/admin/customers'],
            ].map(([label, href]) => (
              <Link key={label} href={href} className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-[#ffb347]/30 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
