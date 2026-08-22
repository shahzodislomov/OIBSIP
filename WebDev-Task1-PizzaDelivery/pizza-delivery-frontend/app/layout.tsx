import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Slice Society | Pizza Delivery & Dining",
  description: "Modern pizza delivery storefront with beautifully designed pages and animated experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#120d0b] text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
