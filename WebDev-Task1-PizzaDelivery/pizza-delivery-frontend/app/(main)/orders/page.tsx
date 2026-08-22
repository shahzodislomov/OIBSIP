import Link from "next/link";

const orders = [
  { id: "#30214", total: "$42.50", status: "Out for delivery", date: "Today, 7:42 PM" },
  { id: "#30106", total: "$27.00", status: "Delivered", date: "Mon, 3:05 PM" },
  { id: "#30088", total: "$35.60", status: "Delivered", date: "Fri, 8:15 PM" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Orders</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Your recent delivery history.</h1>
          </div>
          <Link href="/menu" className="inline-flex items-center justify-center rounded-full border border-[#ffb347]/35 bg-[#ffb347]/10 px-5 py-3 text-sm font-bold text-[#ffcf86] transition hover:bg-[#ffb347]/20">
            Order again
          </Link>
        </div>
      </section>

      <div className="space-y-5">
        {orders.map((order) => (
          <Link key={order.id} href={`/orders/${order.id.replace('#','')}`} className="glass-panel block rounded-[28px] border border-white/10 p-5 transition hover:-translate-y-0.5 hover:border-[#ffb347]/30">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Order {order.id}</p>
                <h2 className="mt-2 text-2xl font-black text-white">{order.date}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#ffb347]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffcf86]">{order.status}</span>
                <span className="text-xl font-black text-white">{order.total}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
