import { cache } from 'react';
import { mockCollections, mockProducts } from './mock-data';
import { MOCK_CHECKOUT_URL } from './config';

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: number;
  currencyCode?: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  featuredImage: string | null;
  images: ShopifyImage[];
  priceRange: {
    min: number;
    max: number;
    currencyCode: string;
  };
  variants: ShopifyVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
}

export const isMockMode = true;

const resolveProducts = cache(async () => mockProducts);
const resolveCollections = cache(async () => mockCollections);

export const listProducts = async (): Promise<ShopifyProduct[]> => {
  return await resolveProducts();
};

export const getProductByHandle = cache(async (handle: string): Promise<ShopifyProduct | null> => {
  const products = await resolveProducts();
  return products.find((product) => product.handle === handle) ?? null;
});

export const listCollections = async (): Promise<ShopifyCollection[]> => {
  return await resolveCollections();
};

export const productsByCollection = cache(async (handle: string): Promise<ShopifyProduct[]> => {
  const products = await resolveProducts();
  if (handle === 'editorial-trending') {
    const trendingTags = ['bestseller', 'most-wanted', 'back-in'];
    return products.filter((product) => trendingTags.some((tag) => product.tags.includes(tag)));
  }
  if (handle === 'new-arrivals') {
    return products.filter((product) => product.tags.includes('new'));
  }
  return products.slice(0, 6);
});

export async function createCheckout(lines: Array<{ merchandiseId: string; quantity: number }>) {
  if (!lines.length) {
    throw new Error('Cart is empty');
  }

  return { checkoutUrl: MOCK_CHECKOUT_URL };
}

export async function shopifyFetch<T>() {
  throw new Error('Remote Shopify access is disabled in preview mode.');
}
