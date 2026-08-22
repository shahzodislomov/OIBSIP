'use client';

import { SiteShell } from "@/components/site-shell";
import { AdminGuard } from "@/components/auth/admin-guard";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SiteShell variant="admin">
      <AdminGuard>{children}</AdminGuard>
    </SiteShell>
  );
}
