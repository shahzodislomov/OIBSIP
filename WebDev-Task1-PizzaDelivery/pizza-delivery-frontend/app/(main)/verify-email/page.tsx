import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-[72vh] items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-xl rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#ffb347]">Almost there</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Verify your email.</h1>
        </div>

        <div className="rounded-[28px] border border-[#ffb347]/20 bg-[#ffb347]/8 p-5 text-center">
          <p className="text-lg leading-8 text-white/75">
            We’ve sent a six-digit verification code to <span className="font-semibold text-white">maya@email.com</span>.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <input
              key={idx}
              defaultValue={idx === 0 ? '4' : ''}
              className="h-14 rounded-2xl border border-white/10 bg-[#1a120f] text-center text-2xl font-black text-white outline-none"
            />
          ))}
        </div>

        <button className="mt-8 w-full rounded-full bg-[#ffb347] px-5 py-3 text-sm font-black text-[#1b120e] shadow-[0_18px_60px_rgba(255,179,71,0.35)] transition hover:bg-[#ffc95e]">
          Verify email
        </button>

        <div className="mt-6 text-center text-sm text-white/60">
          Didn’t get it? <Link href="/verify-email" className="font-semibold text-[#ffcf86]">Resend code</Link>
        </div>
      </div>
    </div>
  );
}
