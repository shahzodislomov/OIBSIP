import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[72vh] items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-xl rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Join us</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Create your account.</h1>
        </div>

        <form className="space-y-5">
          <label className="block space-y-2 text-sm text-white/70">
            <span>Full name</span>
            <input type="text" defaultValue="Maya Johnson" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35" />
          </label>

          <label className="block space-y-2 text-sm text-white/70">
            <span>Email</span>
            <input type="email" defaultValue="maya@email.com" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35" />
          </label>

          <label className="block space-y-2 text-sm text-white/70">
            <span>Password</span>
            <input type="password" defaultValue="password123" className="w-full rounded-2xl border border-white/10 bg-[#1a120f] px-4 py-3 text-white outline-none placeholder:text-white/35" />
          </label>

          <button className="w-full rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
            Create account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/60">
          Already a member? <Link href="/login" className="font-semibold text-[#ffcf86]">Log in</Link>
        </div>
      </div>
    </div>
  );
}
