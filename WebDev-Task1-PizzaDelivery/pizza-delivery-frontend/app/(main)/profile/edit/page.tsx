import Link from "next/link";

export default function ProfileEditPage() {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Account</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Edit your profile</h1>
          </div>
          <Link href="/profile" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            View profile
          </Link>
        </div>
      </section>

      <section className="glass-panel rounded-[30px] border border-white/10 p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2 text-sm text-white/70">
            <span>Full name</span>
            <input defaultValue="Maya Johnson" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>

          <label className="space-y-2 text-sm text-white/70">
            <span>Email</span>
            <input defaultValue="maya@email.com" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>

          <label className="space-y-2 text-sm text-white/70">
            <span>Phone</span>
            <input defaultValue="(415) 555-0142" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>

          <label className="space-y-2 text-sm text-white/70">
            <span>City</span>
            <input defaultValue="San Francisco" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>

          <label className="space-y-2 text-sm text-white/70 md:col-span-2">
            <span>Address</span>
            <input defaultValue="781 Maple Street, Apt 9" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none" />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-[#ffb347] px-6 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            Save changes
          </button>
          <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}
