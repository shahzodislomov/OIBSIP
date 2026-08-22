import Link from "next/link";
import type { ReactNode } from "react";

export function SiteShell({
  children,
  variant = "main",
}: {
  children: ReactNode;
  variant?: "main" | "admin";
}) {
  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/search", label: "Search" },
    { href: "/favorites", label: "Favorites" },
    { href: "/orders", label: "Orders" },
  ];

  const adminLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/customers", label: "Customers" },
  ];

  const links = variant === "main" ? mainLinks : adminLinks;

  return (
    <div className="min-h-screen bg-[#120d0b] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,180,87,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(235,71,47,0.12),transparent_25%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#120d0b]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href={variant === "main" ? "/" : "/admin"} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb347] via-[#ff7b54] to-[#ef4444] text-lg shadow-[0_0_30px_rgba(255,135,82,0.7)]">
              🍕
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#ffca7a]">Pizza Atelier</p>
              <h1 className="text-lg font-black tracking-wide text-white">Slice Society</h1>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-white/75 md:flex">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {variant === "main" ? (
              <>
                <Link href="/login" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-[#ffb347]/60 hover:text-white sm:inline-flex">
                  Login
                </Link>
                <Link href="/cart" className="inline-flex items-center gap-2 rounded-full bg-[#ffb347] px-4 py-2 text-sm font-bold text-[#1b120e] shadow-[0_12px_40px_rgba(255,179,71,0.45)] transition hover:-translate-y-0.5 hover:bg-[#ffc95e]">
                  Cart (3)
                </Link>
              </>
            ) : (
              <Link href="/" className="rounded-full border border-[#ffb347]/35 bg-[#ffb347]/10 px-4 py-2 text-sm font-semibold text-[#ffcf86] transition hover:bg-[#ffb347]/20">
                View storefront
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">{children}</main>

      <footer className="relative z-10 border-t border-white/10 bg-[#140d09] text-white/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb347] via-[#ff7b54] to-[#ef4444] text-sm">🍕</div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ffca7a]">Fresh daily</p>
                <h2 className="text-base font-bold text-white">Slice Society</h2>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-7 text-white/60">
              Slow-fired dough, bold toppings, and late-night comfort food made for memorable evenings.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/80">Explore</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/search">Find a pizza</Link></li>
              <li><Link href="/favorites">Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/80">Support</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/profile">Account</Link></li>
              <li><Link href="/checkout">Checkout</Link></li>
              <li><Link href="/verify-email">Verify email</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/80">Hours</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Mon–Thu: 11:00–23:00</li>
              <li>Fri–Sat: 11:00–01:00</li>
              <li>Sunday: 12:00–22:00</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
