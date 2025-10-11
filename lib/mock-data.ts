import type { ShopifyCollection, ShopifyProduct } from './shopify';

const sharedDescription = `Each piece is hand-finished by master artisans using heritage techniques passed down through generations. Expect subtle variations that make every item one-of-a-kind.`;

export const mockProducts: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'opal-silk-sari',
    title: 'Opal Silk Sari',
    description: `${sharedDescription}\n\nMaterials: Mulberry silk, zari border.`,
    tags: ['sari', 'trending', 'new'],
    featuredImage:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
        altText: 'Opal silk sari draped on mannequin'
      },
      {
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
        altText: 'Close-up of zari border'
      }
    ],
    priceRange: {
      min: 28999,
      max: 28999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/1',
        title: 'Standard',
        price: 28999,
        availableForSale: true
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'heritage-kundan-choker',
    title: 'Heritage Kundan Choker',
    description: `${sharedDescription}\n\nMaterials: 22k gold-plated silver, kundan stones.`,
    tags: ['jewellery', 'trending'],
    featuredImage:
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80',
        altText: 'Kundan choker on marble pedestal'
      }
    ],
    priceRange: {
      min: 45999,
      max: 45999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/2',
        title: '16 inch',
        price: 45999,
        availableForSale: true
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'lotus-ikat-jacket',
    title: 'Lotus Ikat Jacket',
    description: `${sharedDescription}\n\nMaterials: Handloom cotton, natural dyes.`,
    tags: ['apparel', 'editorial'],
    featuredImage:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        altText: 'Ikat jacket styled on model'
      },
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        altText: 'Detail of lotus motif'
      }
    ],
    priceRange: {
      min: 18999,
      max: 18999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/3',
        title: 'S-M',
        price: 18999,
        availableForSale: true
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockCollections: ShopifyCollection[] = [
  {
    id: 'gid://shopify/Collection/1',
    handle: 'editorial-trending',
    title: 'Editorial Trending'
  }
];
