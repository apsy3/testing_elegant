'use client';

import { useState } from 'react';
import { Button } from './Button';
import { useCartStore } from '@/store/cart';
import type { ShopifyProduct } from '@/lib/shopify';

interface AddToCartButtonProps {
  product: ShopifyProduct;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const primaryVariant = product.variants[0];

  const handleAdd = () => {
    if (!primaryVariant) return;
    setIsAdding(true);
    addItem(
      {
        id: primaryVariant.id ?? product.id,
        handle: product.handle,
        title: product.title,
        image: product.featuredImage,
        price: primaryVariant.price || product.priceRange.min,
        currencyCode: product.priceRange.currencyCode,
        variantId: primaryVariant.id
      },
      1
    );
    setTimeout(() => setIsAdding(false), 400);
  };

  return (
    <Button onClick={handleAdd} disabled={isAdding || !primaryVariant?.availableForSale} className="w-full md:w-auto">
      {isAdding ? 'Added' : primaryVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
    </Button>
  );
}
