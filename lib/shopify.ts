import 'server-only';

import { z } from 'zod';
import { mockProducts } from './mock-data';
import { PRODUCT_LIST_QUERY, PRODUCT_BY_HANDLE_QUERY, PRODUCTS_BY_COLLECTION_QUERY, CREATE_CART_MUTATION } from './queries';
import { MOCK_CHECKOUT_URL, SITE_CONFIG } from './config';

type ShopifyImage = {
  url: string;
  altText: string | null;
};

type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
};

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  priceRange: {
    min: number;
    max: number;
    currencyCode: string;
  };
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  createdAt: string;
  updatedAt: string;
}

const isMockMode = !process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

function mapMockProduct(product: (typeof mockProducts)[number]): ShopifyProduct {
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    tags: product.tags,
    priceRange: {
      min: product.priceRange.min,
      max: product.priceRange.max,
      currencyCode: product.priceRange.currency
    },
    featuredImage: product.featuredImage,
    images: product.images,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      title: variant.title,
      availableForSale: true,
      price: {
        amount: variant.price.toString(),
        currencyCode: variant.currencyCode
      }
    })),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
}

const ShopifyResponseSchema = z.object({
  data: z.any(),
  errors: z.any().optional()
});

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (isMockMode) {
    throw new Error('Shopify credentials are missing. Running in mock mode.');
  }

  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? ''
      },
      body: JSON.stringify({ query, variables })
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  const result = ShopifyResponseSchema.safeParse(json);
  if (!result.success) {
    throw new Error('Invalid Shopify response');
  }

  if (result.data.errors) {
    throw new Error('Shopify GraphQL error');
  }

  return result.data.data as T;
}

export async function listProducts(): Promise<ShopifyProduct[]> {
  if (isMockMode) {
    return mockProducts.map(mapMockProduct);
  }

  const data = await shopifyFetch<{
    products: {
      edges: {
        node: any;
      }[];
    };
  }>(PRODUCT_LIST_QUERY);

  return (data.products?.edges ?? []).map(({ node }) => normalizeProduct(node));
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (isMockMode) {
    const product = mockProducts.find((item) => item.handle === handle);
    return product ? mapMockProduct(product) : null;
  }

  const data = await shopifyFetch<{ product: any }>(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.product ? normalizeProduct(data.product) : null;
}

export async function productsByCollection(handle: string): Promise<ShopifyProduct[]> {
  if (isMockMode) {
    return mockProducts.map(mapMockProduct);
  }

  const data = await shopifyFetch<{
    collection: {
      products: {
        edges: {
          node: any;
        }[];
      };
    } | null;
  }>(PRODUCTS_BY_COLLECTION_QUERY, { handle });

  return data.collection ? data.collection.products.edges.map(({ node }) => normalizeProduct(node)) : [];
}

export async function createCheckout(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<{ checkoutUrl: string }> {
  if (isMockMode) {
    return { checkoutUrl: MOCK_CHECKOUT_URL };
  }

  const data = await shopifyFetch<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(CREATE_CART_MUTATION, { lines });

  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors[0]?.message ?? 'Unable to create checkout');
  }

  return {
    checkoutUrl: data.cartCreate.cart?.checkoutUrl ?? MOCK_CHECKOUT_URL
  };
}

function normalizeProduct(node: any): ShopifyProduct {
  const featuredImage = node.featuredImage
    ? { url: node.featuredImage.url, altText: node.featuredImage.altText }
    : null;

  const images = (node.images?.edges ?? []).map(({ node: image }: { node: ShopifyImage }) => ({
    url: image.url,
    altText: image.altText
  }));

  const variants = (node.variants?.edges ?? []).map(({ node: variant }: { node: ShopifyVariant }) => ({
    id: variant.id,
    title: variant.title,
    availableForSale: variant.availableForSale,
    price: {
      amount: variant.price.amount,
      currencyCode: variant.price.currencyCode
    }
  }));

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description ?? '',
    tags: node.tags ?? [],
    priceRange: {
      min: Number(node.priceRange?.minVariantPrice?.amount ?? 0),
      max: Number(node.priceRange?.maxVariantPrice?.amount ?? 0),
      currencyCode: node.priceRange?.minVariantPrice?.currencyCode ?? SITE_CONFIG.currency
    },
    featuredImage,
    images,
    variants,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt
  };
}
