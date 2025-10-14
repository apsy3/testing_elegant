'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore, selectCartCount } from '@/store/cart';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/(marketing)/about', label: 'About' }
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const cartCount = useCartStore(selectCartCount);
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    setSearch('');
  }, [pathname]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/catalog?q=${encodeURIComponent(query)}` : '/catalog');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-charcoal/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl text-charcoal" prefetch>
          Heritage Atelier
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm uppercase tracking-[0.3em] text-charcoal/60 transition-colors hover:text-gold',
                pathname === item.href && 'text-charcoal'
              )}
              prefetch
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <form onSubmit={onSubmit} className="hidden items-center gap-2 rounded-full border border-charcoal/10 bg-white px-4 py-2 md:flex">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              aria-label="Search catalog"
              className="w-40 bg-transparent text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none"
            />
          </form>
          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full border border-charcoal/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-charcoal/70 transition-colors hover:border-gold hover:text-gold"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
