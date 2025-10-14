import { SITE_CONFIG } from './config';

const imageBase =
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80';

export const mockProducts = [
  {
    id: 'mock-heritage-sari',
    handle: 'heritage-sari',
    title: 'Heritage Kanjeevaram Sari',
    description:
      'Hand-loomed Kanjeevaram silk sari with antique zari border, crafted by master weavers in Tamil Nadu.',
    tags: ['category:apparel', 'material:silk', 'gender:women', 'collection:featured', 'trending'],
    priceRange: {
      min: 32000,
      max: 32000,
      currency: SITE_CONFIG.currency
    },
    featuredImage: {
      url: imageBase,
      altText: 'Model draped in a kanjeevaram silk sari'
    },
    images: [
      {
        url: imageBase,
        altText: 'Detail of kanjeevaram sari border'
      }
    ],
    variants: [
      {
        id: 'variant-heritage-sari',
        title: 'Standard',
        price: 32000,
        currencyCode: SITE_CONFIG.currency
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-pashmina-shawl',
    handle: 'pashmina-shawl',
    title: 'Kashmiri Pashmina Shawl',
    description:
      'Feather-light pashmina shawl with hand-embroidered paisley motifs and contrast silk edging.',
    tags: ['category:accessories', 'material:pashmina', 'gender:women', 'collection:featured'],
    priceRange: {
      min: 14500,
      max: 14500,
      currency: SITE_CONFIG.currency
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=1200&q=80',
      altText: 'Hand embroidered pashmina shawl'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=1200&q=80',
        altText: 'Pashmina shawl detail'
      }
    ],
    variants: [
      {
        id: 'variant-pashmina-shawl',
        title: 'One Size',
        price: 14500,
        currencyCode: SITE_CONFIG.currency
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-polki-necklace',
    handle: 'polki-necklace',
    title: 'Heritage Polki Necklace',
    description:
      '22k gold polki choker with uncut diamonds and emerald beads, handcrafted in Jaipur.',
    tags: ['category:jewellery', 'material:gold', 'gender:women', 'collection:featured', 'trending'],
    priceRange: {
      min: 540000,
      max: 540000,
      currency: SITE_CONFIG.currency
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?auto=format&fit=crop&w=1200&q=80',
      altText: 'Polki necklace with emeralds'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?auto=format&fit=crop&w=1200&q=80',
        altText: 'Close up of polki necklace'
      }
    ],
    variants: [
      {
        id: 'variant-polki-necklace',
        title: 'Standard',
        price: 540000,
        currencyCode: SITE_CONFIG.currency
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-ikat-jacket',
    handle: 'ikat-jacket',
    title: 'Handwoven Ikat Jacket',
    description:
      'Structured jacket crafted from handwoven ikat textile with silk lining and horn buttons.',
    tags: ['category:apparel', 'material:cotton', 'gender:men', 'collection:featured'],
    priceRange: {
      min: 18500,
      max: 18500,
      currency: SITE_CONFIG.currency
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      altText: 'Man wearing handwoven jacket'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
        altText: 'Ikat jacket front view'
      }
    ],
    variants: [
      {
        id: 'variant-ikat-jacket',
        title: 'Medium',
        price: 18500,
        currencyCode: SITE_CONFIG.currency
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-leather-brogues',
    handle: 'leather-brogues',
    title: 'Handcrafted Leather Brogues',
    description:
      'Goodyear welted brogues in burnished calfskin with leather sole and cushioned footbed.',
    tags: ['category:shoes', 'material:leather', 'gender:men', 'collection:featured'],
    priceRange: {
      min: 15500,
      max: 15500,
      currency: SITE_CONFIG.currency
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
      altText: 'Leather brogues on display'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
        altText: 'Close up of leather brogues'
      }
    ],
    variants: [
      {
        id: 'variant-leather-brogues',
        title: 'UK 9',
        price: 15500,
        currencyCode: SITE_CONFIG.currency
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-artisan-clutch',
    handle: 'artisan-clutch',
    title: 'Zardozi Evening Clutch',
    description:
      'Silk clutch hand-embroidered with zardozi motifs and embellished clasp.',
    tags: ['category:bags', 'material:silk', 'gender:women', 'collection:featured', 'trending'],
    priceRange: {
      min: 12500,
      max: 12500,
      currency: SITE_CONFIG.currency
    },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
      altText: 'Artisan embroidered clutch'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
        altText: 'Zardozi clutch detail'
      }
    ],
    variants: [
      {
        id: 'variant-artisan-clutch',
        title: 'One Size',
        price: 12500,
        currencyCode: SITE_CONFIG.currency
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export type MockProduct = (typeof mockProducts)[number];
