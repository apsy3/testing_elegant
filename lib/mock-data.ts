import type { ShopifyCollection, ShopifyProduct } from './shopify';

const sharedDescription = `Each piece is hand-finished by master artisans using heritage techniques passed down through generations. Expect subtle variations that make every item one-of-a-kind.`;

const now = new Date();

const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

export const mockProducts: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/100',
    handle: 'noor-day-tote',
    title: 'Noor Day Tote',
    description: `${sharedDescription}\n\nSpacious calf-leather tote with archival hardware and suede-lined interior.`,
    tags: [
      'department:bags',
      'gender:women',
      'occasion:day',
      'material:leather',
      'color:ebony',
      'capacity:18l',
      'device-fit:15in',
      'bestseller',
      'new'
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
        altText: 'Leather tote resting on chair'
      }
    ],
    priceRange: {
      min: 34999,
      max: 34999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/100',
        title: 'OS',
        price: 34999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(12),
    updatedAt: daysAgo(3)
  },
  {
    id: 'gid://shopify/Product/101',
    handle: 'maharani-evening-clutch',
    title: 'Maharani Evening Clutch',
    description: `${sharedDescription}\n\nHand-beaded minaudière with brass clasp and detachable wristlet.`,
    tags: [
      'department:bags',
      'gender:women',
      'occasion:evening',
      'material:embellished',
      'color:champagne',
      'small',
      'back-in'
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        altText: 'Embellished evening clutch'
      }
    ],
    priceRange: {
      min: 27999,
      max: 27999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/101',
        title: 'OS',
        price: 27999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(45),
    updatedAt: daysAgo(1)
  },
  {
    id: 'gid://shopify/Product/102',
    handle: 'traveler-weekend-duffel',
    title: 'Traveler Weekend Duffel',
    description: `${sharedDescription}\n\nLightweight canvas duffel with leather trim and detachable shoulder strap.`,
    tags: [
      'department:bags',
      'gender:unisex',
      'occasion:travel',
      'material:canvas',
      'color:indigo',
      'capacity:35l',
      'device-fit:17in',
      'waterproof:coated',
      'wheels:none',
      'most-wanted'
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1518552781851-0642581099e2?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518552781851-0642581099e2?auto=format&fit=crop&w=1200&q=80',
        altText: 'Canvas weekend duffel'
      }
    ],
    priceRange: {
      min: 31999,
      max: 31999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/102',
        title: 'OS',
        price: 31999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(8),
    updatedAt: daysAgo(2)
  },
  {
    id: 'gid://shopify/Product/103',
    handle: 'lotus-ikat-jacket',
    title: 'Lotus Ikat Jacket',
    description: `${sharedDescription}\n\nMaterials: Handloom cotton, natural dyes.`,
    tags: [
      'department:apparel',
      'gender:women',
      'apparel:outer',
      'material:cotton',
      'fabric:ikat',
      'season:all',
      'color:indigo',
      'fit:tailored',
      'length:hip',
      'new'
    ],
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
        id: 'gid://shopify/ProductVariant/103',
        title: 'S-M',
        price: 18999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(18),
    updatedAt: daysAgo(4)
  },
  {
    id: 'gid://shopify/Product/104',
    handle: 'meridian-linen-shirt',
    title: 'Meridian Linen Shirt',
    description: `${sharedDescription}\n\nEuropean flax linen tailored shirt with concealed placket.`,
    tags: [
      'department:apparel',
      'gender:men',
      'apparel:tops',
      'material:linen',
      'color:ivory',
      'fit:relaxed',
      'season:summer',
      'size:38',
      'size:40',
      'size:42'
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
        altText: 'Mens linen shirt on hanger'
      }
    ],
    priceRange: {
      min: 12999,
      max: 12999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/104',
        title: '38',
        price: 12999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(70),
    updatedAt: daysAgo(10)
  },
  {
    id: 'gid://shopify/Product/105',
    handle: 'cliffside-leather-boots',
    title: 'Cliffside Leather Boots',
    description: `${sharedDescription}\n\nFull-grain leather lace-up boots with stacked heel and rubber sole.`,
    tags: [
      'department:shoes',
      'gender:men',
      'shoes:boots',
      'material:leather',
      'color:espresso',
      'size:uk8',
      'size:uk9',
      'width:standard',
      'closure:laced',
      'heel-height:35mm',
      'work'
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1588361861040-03dcf6c2d1d4?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1588361861040-03dcf6c2d1d4?auto=format&fit=crop&w=1200&q=80',
        altText: 'Leather boots on wooden table'
      }
    ],
    priceRange: {
      min: 25999,
      max: 25999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/105',
        title: 'UK8',
        price: 25999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(90),
    updatedAt: daysAgo(5)
  },
  {
    id: 'gid://shopify/Product/106',
    handle: 'ayra-sculptural-heels',
    title: 'Ayra Sculptural Heels',
    description: `${sharedDescription}\n\nHand-carved teak heel with suede straps and cushioned footbed.`,
    tags: [
      'department:shoes',
      'gender:women',
      'shoes:heels',
      'material:suede',
      'color:sand',
      'size:36',
      'size:37',
      'size:38',
      'heel-height:85mm',
      'closure:buckle',
      'most-wanted'
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
        altText: 'Pair of sculptural heels'
      }
    ],
    priceRange: {
      min: 22999,
      max: 22999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/106',
        title: '36',
        price: 22999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(25),
    updatedAt: daysAgo(6)
  },
  {
    id: 'gid://shopify/Product/107',
    handle: 'aurora-kundan-choker',
    title: 'Aurora Kundan Choker',
    description: `${sharedDescription}\n\n22k gold-plated silver with kundan setting and detachable drop pendant.`,
    tags: [
      'department:jewellery',
      'gender:women',
      'material:gold',
      'color:rose',
      'bestseller'
    ],
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
        id: 'gid://shopify/ProductVariant/107',
        title: '16 inch',
        price: 45999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(55),
    updatedAt: daysAgo(12)
  },
  {
    id: 'gid://shopify/Product/108',
    handle: 'raj-emerald-cufflinks',
    title: 'Raj Emerald Cufflinks',
    description: `${sharedDescription}\n\nHand-engraved sterling silver cufflinks with emerald cabochons.`,
    tags: [
      'department:jewellery',
      'gender:men',
      'material:silver',
      'color:emerald',
      'back-in'
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80',
        altText: 'Emerald cufflinks'
      }
    ],
    priceRange: {
      min: 18999,
      max: 18999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/108',
        title: 'OS',
        price: 18999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(14),
    updatedAt: daysAgo(2)
  },
  {
    id: 'gid://shopify/Product/109',
    handle: 'monsoon-handloom-scarf',
    title: 'Monsoon Handloom Scarf',
    description: `${sharedDescription}\n\nHand-dyed eri silk scarf finished with hand-twisted tassels.`,
    tags: [
      'department:accessories',
      'gender:unisex',
      'accessories:scarves',
      'material:silk',
      'color:teal',
      'season:all',
      'occasion:day',
      'sale'
    ],
    featuredImage:
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
        altText: 'Handloom scarf displayed on chair'
      }
    ],
    priceRange: {
      min: 8999,
      max: 8999,
      currencyCode: 'INR'
    },
    variants: [
      {
        id: 'gid://shopify/ProductVariant/109',
        title: 'OS',
        price: 8999,
        availableForSale: true
      }
    ],
    createdAt: daysAgo(120),
    updatedAt: daysAgo(7)
  }
];

export const mockCollections: ShopifyCollection[] = [
  {
    id: 'gid://shopify/Collection/1',
    handle: 'editorial-trending',
    title: 'Editorial Trending'
  }
];
