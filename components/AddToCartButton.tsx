'use client';

import { useTransition } from 'react';
import { Button } from './Button';
import { useCartStore } from '@/store/cart';
import type { ShopifyProduct } from '@/lib/shopify';

interface AddToCartButtonProps {
  product: ShopifyProduct;
  variant: ShopifyProduct['variants'][number];
  className?: string;
}

export default function AddToCartButton({ product, variant, className }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      addItem(
        {
          id: variant.id,
          handle: product.handle,
          title: product.title,
          image: product.featuredImage?.url ?? product.images[0]?.url ?? null,
          price: product.priceRange.min,
          currencyCode: product.priceRange.currencyCode,
          variantId: variant.id
        },
        1
      );
      openCart();
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} className={className}>
      {isPending ? 'Adding…' : 'Add to Cart'}
    </Button>
  );
}
