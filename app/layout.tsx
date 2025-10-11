import type { Metadata } from 'next';
<<<<<<< HEAD
<<<<<<< HEAD
import { Inter, Fraunces } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';
import { metadata as defaultMetadata } from '@/lib/seo';
=======
import { Suspense } from 'react';
=======
>>>>>>> e3974fd (fix: unblock static builds)
import { Inter, Fraunces } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';
import { metadata as defaultMetadata, viewport as defaultViewport } from '@/lib/seo';
<<<<<<< HEAD
>>>>>>> 9f14315 (fix: drop useSearchParams to unblock static build)
=======
>>>>>>> e3974fd (fix: unblock static builds)
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });

export const metadata: Metadata = defaultMetadata;
<<<<<<< HEAD
<<<<<<< HEAD
=======
export const viewport = defaultViewport;
>>>>>>> 9f14315 (fix: drop useSearchParams to unblock static build)
=======
export const viewport = defaultViewport;
>>>>>>> e3974fd (fix: unblock static builds)

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(inter.variable, fraunces.variable)}>
      <body className="bg-white text-charcoal font-sans">
<<<<<<< HEAD
<<<<<<< HEAD
        <Header />
=======
        <Suspense fallback={<div className="h-20 border-b border-charcoal/10 bg-white" />}>
          <Header />
        </Suspense>
>>>>>>> 9f14315 (fix: drop useSearchParams to unblock static build)
=======
        <Header />
>>>>>>> e3974fd (fix: unblock static builds)
        <main className="min-h-screen pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
