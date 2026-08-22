import Link from "next/link";

const customers = [
  { name: "Maya Johnson", email: "maya@email.com", orders: 12, spend: "$421" },
  { name: "Leo Grant", email: "leo@email.com", orders: 8, spend: "$290" },
  { name: "Nina Tran", email: "nina@email.com", orders: 15, spend: "$510" },
  { name: "Jess Rivera", email: "jess@email.com", orders: 7, spend: "$244" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Customers</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Guest loyalty overview</h1>
      </section>

      <div className="space-y-4">
        {customers.map((customer) => (
          <Link key={customer.email} href={`/admin/customers/${customer.name.toLowerCase().replace(/\s+/g, '-')}`} className="glass-panel block rounded-[28px] border border-white/10 p-5 transition hover:border-[#ffb347]/30">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-black text-white">{customer.name}</p>
                <p className="mt-1 text-sm text-white/55">{customer.email}</p>
              </div>
              <div className="flex items-center gap-6 text-sm text-white/70">
                <span>Orders: {customer.orders}</span>
                <span>Spend: {customer.spend}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
