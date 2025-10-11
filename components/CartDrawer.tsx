'use client';

import { Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SITE_CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';
import {
  useCartStore,
  selectCartTotal,
  selectCartLines,
  type CartItem
} from '@/store/cart';
import { Button } from './Button';

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);
  const lines = useCartStore(selectCartLines);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = async () => {
    setError(null);
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/shopify/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lines })
      });

      if (!response.ok) {
        throw new Error('Unable to start checkout. Please try again.');
      }

      const payload = await response.json();
      if (!payload.checkoutUrl) {
        throw new Error('Checkout link not available.');
      }

      window.location.href = payload.checkoutUrl as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <h2 className="font-display text-xl tracking-wide">Your Cart</h2>
              <button onClick={closeCart} aria-label="Close cart" className="btn-focus">
                <XMarkIcon className="h-6 w-6 text-charcoal" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-sm text-charcoal/60">
                  Your collection is empty. Discover new heirlooms in our catalog.
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      item={item}
                      onRemove={() => removeItem(item.id)}
                      onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                    />
                  ))}
                </ul>
              )}
            </div>
            <footer className="border-t border-charcoal/10 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-widest text-charcoal/60">Subtotal</span>
                <span className="text-base font-semibold">
                  {formatCurrency(total, SITE_CONFIG.currency, SITE_CONFIG.locale)}
                </span>
              </div>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
              <Button
                className="mt-6 w-full"
                onClick={handleCheckout}
                disabled={!items.length || isCheckingOut}
              >
                {isCheckingOut ? 'Preparing checkout…' : 'Proceed to Checkout'}
              </Button>
            </footer>
          </motion.aside>
        </Fragment>
      )}
    </AnimatePresence>,
    document.body
  );
}

interface CartDrawerItemProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

function CartDrawerItem({ item, onQuantityChange, onRemove }: CartDrawerItemProps) {
  return (
    <li className="flex items-start gap-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-fog">
        {item.image ? (
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wide text-charcoal/40">
            No image
          </span>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-charcoal">{item.title}</p>
            <p className="text-xs uppercase tracking-wider text-charcoal/50">{item.handle}</p>
          </div>
          <button onClick={onRemove} className="text-xs text-charcoal/50 hover:text-gold" aria-label="Remove item">
            Remove
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="inline-flex items-center rounded-full border border-charcoal/10">
            <button
              type="button"
              className="px-3 py-1 text-charcoal/70 hover:text-gold"
              onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-3 text-charcoal">{item.quantity}</span>
            <button
              type="button"
              className="px-3 py-1 text-charcoal/70 hover:text-gold"
              onClick={() => onQuantityChange(item.quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="font-medium text-charcoal">
            {formatCurrency(item.price * item.quantity, item.currencyCode, SITE_CONFIG.locale)}
          </span>
        </div>
      </div>
    </li>
  );
}
