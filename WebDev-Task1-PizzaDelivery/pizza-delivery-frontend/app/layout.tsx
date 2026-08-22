import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import { ToastProvider } from '@/components/ui/toast';
import { CartDrawer } from '@/components/cart-drawer';

export const metadata: Metadata = {
  title: 'PizzaCraft | Artisanal Stone-Fired Pizza Delivery',
  description: 'Order wood-fired artisanal pizzas online with custom pizza builder, real-time live order tracking, and fast delivery.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full text-white">
        <Providers>
          <ToastProvider>
            {children}
            <CartDrawer />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
