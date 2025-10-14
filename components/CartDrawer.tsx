'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, selectCartLines, selectCartTotal, selectCartCount } from '@/store/cart';
import { Button } from './Button';
import Price from './Price';
import { SITE_CONFIG } from '@/lib/config';

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQuantity);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore(selectCartTotal);
  const lines = useCartStore(selectCartLines);
  const itemCount = useCartStore(selectCartCount);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkout = () => {
    startTransition(async () => {
      try {
        setError(null);
        const response = await fetch('/api/shopify/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ lines })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? 'Unable to create checkout');
        }

        if (data.checkoutUrl) {
          router.push(data.checkoutUrl);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to checkout');
      }
    });
  };

  return (
    <div
      className={
        isOpen
          ? 'pointer-events-auto fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur'
          : 'pointer-events-none fixed inset-0 z-50 flex justify-end'
      }
      aria-hidden={!isOpen}
    >
      <div className={`h-full w-full max-w-md transform bg-white p-6 shadow-2xl transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-charcoal">Shopping Cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-sm uppercase tracking-[0.3em] text-charcoal/50 hover:text-gold"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-4 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm uppercase tracking-[0.3em] text-charcoal/40">Your cart is currently empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-24 w-24 overflow-hidden rounded-2xl bg-fog">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-charcoal/40">{item.handle}</p>
                      <p className="font-display text-lg text-charcoal">{item.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs uppercase tracking-[0.3em] text-charcoal/40 hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm text-charcoal/70">
                    <label className="flex items-center gap-2">
                      Qty
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) => updateQty(item.id, Number(event.target.value))}
                        className="w-16 rounded-full border border-charcoal/10 px-3 py-1 text-sm focus:border-gold focus:outline-none"
                      />
                    </label>
                    <Price amount={item.price * item.quantity} currencyCode={item.currencyCode} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-sm text-charcoal/70">
            <span>Subtotal ({itemCount} items)</span>
            <Price amount={total} currencyCode={SITE_CONFIG.currency} />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button onClick={checkout} disabled={items.length === 0 || isPending} className="w-full">
            {isPending ? 'Processing…' : 'Proceed to Checkout'}
          </Button>
          <button
            type="button"
            onClick={clear}
            className="w-full text-xs uppercase tracking-[0.3em] text-charcoal/40 hover:text-gold"
          >
            Clear Cart
          </button>
          <Link
            href="/catalog"
            onClick={closeCart}
            className="block text-center text-xs uppercase tracking-[0.3em] text-charcoal/50 hover:text-gold"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
