'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, selectCartLines, selectCartTotal, selectCartCount } from '@/store/cart';
import Price from './Price';
import { Button } from './Button';
import { SITE_CONFIG } from '@/lib/config';

export default function CartPageClient() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQuantity);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore(selectCartTotal);
  const itemCount = useCartStore(selectCartCount);
  const lines = useCartStore(selectCartLines);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const checkout = () => {
    startTransition(async () => {
      try {
        setError(null);
        const response = await fetch('/api/shopify/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lines })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? 'Unable to checkout');
        }
        if (data.checkoutUrl) {
          router.push(data.checkoutUrl);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to checkout');
      }
    });
  };

  if (!items.length) {
    return (
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-charcoal/40">Your cart is currently empty.</p>
        <Button asChild>
          <Link href="/catalog">Discover the collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-charcoal/10 p-6 shadow-soft sm:flex-row">
            <div className="h-32 w-full overflow-hidden rounded-2xl bg-fog sm:w-48">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">{item.handle}</p>
                <h2 className="font-display text-xl text-charcoal">{item.title}</h2>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-charcoal/70">
                <label className="flex items-center gap-2">
                  Qty
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => updateQty(item.id, Number(event.target.value))}
                    className="w-20 rounded-full border border-charcoal/10 px-3 py-1 focus:border-gold focus:outline-none"
                  />
                </label>
                <Price amount={item.price * item.quantity} currencyCode={item.currencyCode} />
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-xs uppercase tracking-[0.3em] text-charcoal/40 hover:text-gold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between text-sm text-charcoal/70">
          <span>Subtotal ({itemCount} items)</span>
          <Price amount={total} currencyCode={SITE_CONFIG.currency} />
        </div>
        <p className="mt-2 text-xs text-charcoal/40">Taxes and shipping calculated at checkout.</p>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={checkout} disabled={isPending}>
            {isPending ? 'Processing…' : 'Proceed to Checkout'}
          </Button>
          <button
            type="button"
            onClick={clear}
            className="text-xs uppercase tracking-[0.3em] text-charcoal/40 hover:text-gold"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
