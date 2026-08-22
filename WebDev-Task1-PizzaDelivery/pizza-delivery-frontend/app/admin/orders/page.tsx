import Link from "next/link";

const orders = [
  { id: "#30214", customer: "Maya Johnson", total: "$42.50", status: "Preparing" },
  { id: "#30215", customer: "Leo Grant", total: "$31.50", status: "On route" },
  { id: "#30216", customer: "Nina Tran", total: "$58.90", status: "Completed" },
  { id: "#30217", customer: "Jess Rivera", total: "$41.00", status: "Pending" },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Orders</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">All incoming orders</h1>
      </section>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} href={`/admin/orders/${order.id.replace('#', '')}`} className="glass-panel block rounded-[28px] border border-white/10 p-5 transition hover:border-[#ffb347]/30">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">{order.id}</p>
                <h2 className="mt-2 text-2xl font-black text-white">{order.customer}</h2>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-[#ffcf86]">{order.total}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">{order.status}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
