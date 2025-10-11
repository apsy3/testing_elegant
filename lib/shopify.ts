import { cache } from 'react';
import {
  COLLECTION_LIST_QUERY,
  CREATE_CART_MUTATION,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCT_LIST_QUERY,
  PRODUCTS_BY_COLLECTION_QUERY
} from './queries';
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

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const isMockMode = !SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const endpoint = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`
  : '';

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  tags?: string[]
): Promise<T> {
  if (isMockMode) {
    throw new Error('Shopify credentials are not configured. Falling back to mock data.');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? ''
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60, tags }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Shopify request failed: ${response.status} ${response.statusText} — ${text}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((err: { message: string }) => err.message).join(', '));
  }

  return json.data as T;
}

function parseProduct(node: any): ShopifyProduct {
  const images: ShopifyImage[] = (node.images?.edges ?? [])
    .map((edge: any) => edge?.node)
    .filter(Boolean)
    .map((img: any) => ({
      url: img.url,
      altText: img.altText
    }));

  const variants: ShopifyVariant[] = (node.variants?.edges ?? [])
    .map((edge: any) => edge?.node)
    .filter(Boolean)
    .map((variant: any) => ({
      id: variant.id,
      title: variant.title,
      availableForSale: Boolean(variant.availableForSale),
      price: Math.round(parseFloat(variant.price?.amount ?? variant.price ?? '0') * 100) / 100,
      currencyCode: variant.price?.currencyCode
    }));

  const minPrice = parseFloat(node.priceRange?.minVariantPrice?.amount ?? '0');
  const maxPrice = parseFloat(node.priceRange?.maxVariantPrice?.amount ?? '0');

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description ?? '',
    tags: node.tags ?? [],
    featuredImage: node.featuredImage?.url ?? images[0]?.url ?? null,
    images,
    priceRange: {
      min: Math.round(minPrice * 100) / 100,
      max: Math.round(maxPrice * 100) / 100,
      currencyCode: node.priceRange?.minVariantPrice?.currencyCode ?? 'INR'
    },
    variants,
    createdAt: node.createdAt ?? new Date().toISOString(),
    updatedAt: node.updatedAt ?? new Date().toISOString()
  };
}

function parseCollection(node: any): ShopifyCollection {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title
  };
}

export const listProducts = cache(async (): Promise<ShopifyProduct[]> => {
  if (isMockMode) {
    return mockProducts;
  }

  const data = await shopifyFetch<{ products: { edges: Array<{ node: any }> } }>(
    PRODUCT_LIST_QUERY,
    undefined,
    ['products']
  );

  return data.products.edges.map((edge) => parseProduct(edge.node));
});

export const getProductByHandle = cache(async (handle: string): Promise<ShopifyProduct | null> => {
  if (isMockMode) {
    return mockProducts.find((product) => product.handle === handle) ?? null;
  }

  const data = await shopifyFetch<{ product: any }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
    [`product-${handle}`]
  );

  if (!data.product) {
    return null;
  }

  return parseProduct(data.product);
});

export const listCollections = cache(async (): Promise<ShopifyCollection[]> => {
  if (isMockMode) {
    return mockCollections;
  }

  const data = await shopifyFetch<{ collections: { edges: Array<{ node: any }> } }>(
    COLLECTION_LIST_QUERY,
    undefined,
    ['collections']
  );

  return data.collections.edges.map((edge) => parseCollection(edge.node));
});

export const productsByCollection = cache(async (handle: string): Promise<ShopifyProduct[]> => {
  if (isMockMode) {
    return mockProducts.filter((product) => product.tags.includes('trending'));
  }

  const data = await shopifyFetch<{ collection: { products: { edges: Array<{ node: any }> } } }>(
    PRODUCTS_BY_COLLECTION_QUERY,
    { handle },
    [`collection-${handle}`]
  );

  if (!data.collection) {
    return [];
  }

  return data.collection.products.edges.map((edge) => parseProduct(edge.node));
});

export async function createCheckout(lines: Array<{ merchandiseId: string; quantity: number }>) {
  if (!lines.length) {
    throw new Error('Cart is empty');
  }

  if (isMockMode) {
    return { checkoutUrl: MOCK_CHECKOUT_URL };
  }

  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: Array<{ field: string[] | null; message: string }>;
    };
  }>(CREATE_CART_MUTATION, { lines });

  if (data.cartCreate.userErrors?.length) {
    const message = data.cartCreate.userErrors.map((error) => error.message).join(', ');
    throw new Error(message);
  }

  if (!data.cartCreate.cart?.checkoutUrl) {
    throw new Error('Failed to create checkout');
  }

  return { checkoutUrl: data.cartCreate.cart.checkoutUrl };
}
