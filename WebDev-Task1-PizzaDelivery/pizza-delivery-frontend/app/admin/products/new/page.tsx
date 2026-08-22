import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Products</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Create a new pizza</h1>
          </div>
          <Link href="/admin/products" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Back to products
          </Link>
        </div>
      </section>

      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2 text-sm text-white/70 md:col-span-2">
            <span>Product name</span>
            <input defaultValue="Smoked Honey Sicilian" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>

          <label className="space-y-2 text-sm text-white/70">
            <span>Price</span>
            <input defaultValue="$25" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>

          <label className="space-y-2 text-sm text-white/70">
            <span>Inventory</span>
            <input defaultValue="18" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>

          <label className="space-y-2 text-sm text-white/70 md:col-span-2">
            <span>Description</span>
            <textarea rows={5} defaultValue="Sweet smoke, mozzarella, caramelized onion, and a citrus finish for a rich late-night favorite." className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-[#ffb347] px-6 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            Publish product
          </button>
          <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Save draft
          </button>
        </div>
      </section>
    </div>
  );
}
