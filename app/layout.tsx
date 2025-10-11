import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';
import { metadata as defaultMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(inter.variable, fraunces.variable)}>
      <body className="bg-white text-charcoal font-sans">
        <Header />
        <main className="min-h-screen pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
