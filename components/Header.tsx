'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import Container from './Container';
import CartDrawer from './CartDrawer';
import { useCartStore, selectCartCount } from '@/store/cart';
import { NAVIGATION, type NavItem } from '@/lib/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  navItems?: NavItem[];
}

export default function Header({ navItems = [] }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [openNav, setOpenNav] = useState<string | null>(null);
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
    router.push(`/search${queryString ? `?${queryString}` : ''}`);
  };

  const activeLink = useMemo(() => pathname?.split('?')[0], [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-charcoal/10 bg-white/80 backdrop-blur-lg">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="font-display text-xl tracking-widest uppercase" prefetch>
          Heritage Atelier
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-charcoal/70 md:flex">
          {(navItems.length ? navItems : NAVIGATION).map((item) => {
            const isActive = activeLink?.startsWith(item.href);
            const hasMenu = Boolean(item.groups && item.groups.length);
            return (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => hasMenu && setOpenNav(item.title)}
                onMouseLeave={() => setOpenNav((current) => (current === item.title ? null : current))}
              >
                <Link
                  href={item.href}
                  prefetch
                  className={cn(
                    'inline-flex items-center gap-1 transition-colors duration-200',
                    isActive ? 'text-charcoal' : 'hover:text-gold'
                  )}
                  onFocus={() => hasMenu && setOpenNav(item.title)}
                >
                  {item.title}
                  {hasMenu && <ChevronDownIcon className="h-3 w-3" aria-hidden />}
                </Link>
                {hasMenu && openNav === item.title && (
                  <div className="absolute left-1/2 top-full z-40 mt-4 w-[32rem] -translate-x-1/2 rounded-3xl border border-charcoal/10 bg-white/95 p-6 shadow-soft">
                    <div className="grid gap-6 md:grid-cols-2">
                      {item.groups?.map((group) => (
                        <div key={group.title} className="space-y-3">
                          <Link
                            href={group.href}
                            className="font-display text-lg text-charcoal hover:text-gold"
                            prefetch
                          >
                            {group.title}
                          </Link>
                          <ul className="space-y-2 text-sm text-charcoal/70">
                            {group.children?.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="transition-colors hover:text-gold"
                                  prefetch
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
