import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { metadata as defaultMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { listProducts } from '@/lib/shopify';
import { buildNavigation } from '@/lib/navigation';
import { CartProvider } from '@/store/cart';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });

export const metadata: Metadata = defaultMetadata;

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const products = await listProducts();
  const navItems = buildNavigation(products);

  return (
    <html lang="en" className={cn(inter.variable, fraunces.variable)}>
      <body className="bg-white text-charcoal font-sans">
        <CartProvider>
          <Header navItems={navItems} />
          <main className="min-h-screen pt-24">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
