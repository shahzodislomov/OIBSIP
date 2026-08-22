import Link from "next/link";

const products = [
  { name: "Truffle Mushroom", stock: 18, price: "$22", status: "Live" },
  { name: "Sunset Margherita", stock: 26, price: "$19", status: "Live" },
  { name: "Fire Crust Pepperoni", stock: 12, price: "$24", status: "Low stock" },
  { name: "Garden Veggie", stock: 20, price: "$21", status: "Live" },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Products</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Menu management</h1>
          </div>
          <Link href="/admin/products/new" className="inline-flex items-center justify-center rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            + New product
          </Link>
        </div>
      </section>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.name} className="glass-panel flex flex-col gap-4 rounded-[28px] border border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-black text-white">{product.name}</p>
              <p className="mt-1 text-sm text-white/55">Stock: {product.stock} units</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#ffb347]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffcf86]">{product.status}</span>
              <span className="text-xl font-black text-[#ffcf86]">{product.price}</span>
              <Link href="/admin/products/1/edit" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
