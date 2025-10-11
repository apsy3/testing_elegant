'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from './Button';
import { SITE_CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';
import { selectCartLines, selectCartTotal, useCartStore } from '@/store/cart';

export default function CartPageClient() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);
  const lines = useCartStore(selectCartLines);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/shopify/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines })
      });
      if (!response.ok) {
        throw new Error('Unable to initiate checkout.');
      }
      const payload = await response.json();
      if (!payload.checkoutUrl) {
        throw new Error('Checkout URL missing.');
      }
      window.location.href = payload.checkoutUrl as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-charcoal/20 bg-white/70 p-12 text-center text-sm text-charcoal/60">
        Your cart is empty. Explore the catalog to discover new heirlooms.
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-6 rounded-3xl border border-charcoal/10 bg-white/80 p-6 shadow-soft sm:flex-row">
            <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-fog sm:w-48">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 192px" />
              ) : (
                <span className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-charcoal/40">
                  No image
                </span>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-medium text-charcoal">{item.title}</p>
                  <p className="text-xs uppercase tracking-widest text-charcoal/50">{item.handle}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-charcoal/50 hover:text-gold"
                  aria-label={`Remove ${item.title}`}
                >
                  Remove
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/70">
                <div className="inline-flex items-center rounded-full border border-charcoal/10">
                  <button
                    type="button"
                    className="px-3 py-1 text-charcoal/70 hover:text-gold"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-4 text-charcoal">{item.quantity}</span>
                  <button
                    type="button"
                    className="px-3 py-1 text-charcoal/70 hover:text-gold"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span>
                  {formatCurrency(item.price, item.currencyCode, SITE_CONFIG.locale)} each
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-6 rounded-3xl border border-charcoal/10 bg-white/80 p-6 shadow-soft">
        <div className="flex items-center justify-between text-sm">
          <span className="uppercase tracking-widest text-charcoal/60">Subtotal</span>
          <span className="text-base font-semibold text-charcoal">
            {formatCurrency(total, SITE_CONFIG.currency, SITE_CONFIG.locale)}
          </span>
        </div>
        <p className="text-xs text-charcoal/50">
          Taxes and shipping calculated at checkout. All orders include certificate of authenticity.
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
          {isCheckingOut ? 'Preparing checkout…' : 'Checkout'}
        </Button>
        <button type="button" className="text-xs uppercase tracking-widest text-charcoal/50 hover:text-gold" onClick={clear}>
          Clear cart
        </button>
      </div>
    </div>
  );
}
