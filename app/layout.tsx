<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';
import { metadata as defaultMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { listProducts } from '@/lib/shopify';
import { buildNavigation } from '@/lib/navigation';

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
    <html lang="en" className={clsx(inter.variable, fraunces.variable)}>
      <body className="bg-white text-charcoal font-sans">
        <Header navItems={navItems} />
        <main className="min-h-screen pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
<<<<<<< HEAD
=======
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Make all pages dynamic for TESTING (skip prerender traps)
export const dynamic = 'force-dynamic'

// Keep metadata simple — DO NOT put themeColor here
export const metadata: Metadata = {
  title: { default: 'Your Brand', template: '%s | Your Brand' },
  description: 'Modern luxury storefront (test build).',
}

// themeColor belongs in viewport (not metadata)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Any client component that might use useSearchParams MUST be inside Suspense */}
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  )
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
}
