import { SiteShell } from "@/components/site-shell";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteShell variant="admin">{children}</SiteShell>;
}
