<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Container from './Container';
import CartDrawer from './CartDrawer';
import { useCartStore, selectCartCount } from '@/store/cart';
import { cn } from '@/lib/utils';

const links = [
  { href: '/catalog', label: 'Catalog' },
  { href: '/(marketing)/about', label: 'About' }
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const count = useCartStore(selectCartCount);
  const openCart = useCartStore((state) => state.openCart);
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const trimmed = search.trim();
    if (trimmed) {
      params.set('q', trimmed);
    }
    const queryString = params.toString();
    router.push(`/catalog${queryString ? `?${queryString}` : ''}`);
  };

  const activeLink = useMemo(() => pathname?.split('?')[0], [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-charcoal/10 bg-white/80 backdrop-blur-lg">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="font-display text-xl tracking-widest uppercase" prefetch>
          Heritage Atelier
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-charcoal/70 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              className={cn(
                'transition-colors duration-200',
                activeLink === link.href ? 'text-charcoal' : 'hover:text-gold'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <form
            onSubmit={onSubmit}
            className="hidden max-w-xs flex-1 items-center rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm shadow-sm focus-within:border-gold focus-within:ring-1 focus-within:ring-gold md:flex"
            role="search"
            aria-label="Search products"
          >
            <MagnifyingGlassIcon className="mr-2 h-4 w-4 text-charcoal/40" aria-hidden />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search pieces"
              className="w-full bg-transparent text-charcoal placeholder:text-charcoal/40 focus:outline-none"
              name="q"
              aria-label="Search catalog"
            />
          </form>
          <button
            type="button"
            className="relative inline-flex items-center rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm font-medium text-charcoal hover:border-gold hover:text-gold btn-focus"
            onClick={openCart}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
          >
            <ShoppingBagIcon className="mr-2 h-5 w-5" aria-hidden />
            Cart
            {count > 0 && (
              <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </Container>
      <CartDrawer />
    </header>
  );
}
=======
import dynamic from 'next/dynamic';

const HeaderClient = dynamic(() => import('./HeaderClient'), {
  ssr: false
});

export default HeaderClient;
>>>>>>> 9f14315 (fix: drop useSearchParams to unblock static build)
