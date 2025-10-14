import type { ShopifyProduct } from './shopify';
<<<<<<< HEAD
import { getCatalogDefinition, normalizeProducts } from './catalog';
import type { NormalizedProduct } from './catalog';
=======
import { getCatalogDefinition, normalizeProducts } from './taxonomy';
>>>>>>> origin/main

export interface NavLeaf {
  title: string;
  href: string;
  slug?: string[];
}

export interface NavGroup {
  title: string;
  href: string;
  slug?: string[];
  children?: NavLeaf[];
}

export interface NavItem {
  title: string;
  href: string;
  slug?: string[];
  groups?: NavGroup[];
}

const BASE_NAVIGATION: NavItem[] = [
  {
    title: 'New',
    href: '/new/all',
    slug: ['new', 'all'],
    groups: [
      {
        title: 'Discover',
        href: '/new/all',
        slug: ['new', 'all'],
        children: [
          { title: 'All', href: '/new/all', slug: ['new', 'all'] },
          { title: 'Bags', href: '/new/bags', slug: ['new', 'bags'] },
          { title: 'Apparel', href: '/new/apparel', slug: ['new', 'apparel'] },
          { title: 'Shoes', href: '/new/shoes', slug: ['new', 'shoes'] }
        ]
      }
    ]
  },
  {
    title: 'Trending',
    href: '/trending/bestsellers',
    slug: ['trending', 'bestsellers'],
    groups: [
      {
        title: 'Spotlight',
        href: '/trending/bestsellers',
        slug: ['trending', 'bestsellers'],
        children: [
          { title: 'Bestsellers', href: '/trending/bestsellers', slug: ['trending', 'bestsellers'] },
          { title: 'Most-Wanted', href: '/trending/most-wanted', slug: ['trending', 'most-wanted'] },
          { title: 'Back-In', href: '/trending/back-in', slug: ['trending', 'back-in'] }
        ]
      }
    ]
  },
  {
    title: 'Women',
    href: '/women',
    slug: ['women'],
    groups: [
      {
        title: 'Bags',
        href: '/women/bags',
        slug: ['women', 'bags'],
        children: [
          { title: 'Day', href: '/women/bags/day', slug: ['women', 'bags', 'day'] },
          { title: 'Travel', href: '/women/bags/travel', slug: ['women', 'bags', 'travel'] },
          { title: 'Small', href: '/women/bags/small', slug: ['women', 'bags', 'small'] },
          { title: 'Evening', href: '/women/bags/evening', slug: ['women', 'bags', 'evening'] }
        ]
      },
      {
        title: 'Apparel',
        href: '/women/apparel',
        slug: ['women', 'apparel'],
        children: [
          { title: 'Tops', href: '/women/apparel/tops', slug: ['women', 'apparel', 'tops'] },
          { title: 'Bottoms', href: '/women/apparel/bottoms', slug: ['women', 'apparel', 'bottoms'] },
          { title: 'Outer', href: '/women/apparel/outer', slug: ['women', 'apparel', 'outer'] },
          { title: 'Dresses', href: '/women/apparel/dresses', slug: ['women', 'apparel', 'dresses'] }
        ]
      },
      {
        title: 'Shoes',
        href: '/women/shoes',
        slug: ['women', 'shoes'],
        children: [
          { title: 'Sneakers', href: '/women/shoes/sneakers', slug: ['women', 'shoes', 'sneakers'] },
          { title: 'Boots', href: '/women/shoes/boots', slug: ['women', 'shoes', 'boots'] },
          { title: 'Sandals', href: '/women/shoes/sandals', slug: ['women', 'shoes', 'sandals'] },
          { title: 'Heels', href: '/women/shoes/heels', slug: ['women', 'shoes', 'heels'] }
        ]
      },
      {
        title: 'Accessories',
        href: '/women/accessories',
        slug: ['women', 'accessories'],
        children: [
          { title: 'Belts', href: '/women/accessories/belts', slug: ['women', 'accessories', 'belts'] },
          { title: 'Scarves', href: '/women/accessories/scarves', slug: ['women', 'accessories', 'scarves'] },
          { title: 'Headwear', href: '/women/accessories/headwear', slug: ['women', 'accessories', 'headwear'] },
          { title: 'Umbrellas', href: '/women/accessories/umbrellas', slug: ['women', 'accessories', 'umbrellas'] }
        ]
      }
    ]
  },
  {
    title: 'Men',
    href: '/men',
    slug: ['men'],
    groups: [
      {
        title: 'Bags',
        href: '/men/bags',
        slug: ['men', 'bags'],
        children: [
          { title: 'Day', href: '/men/bags/day', slug: ['men', 'bags', 'day'] },
          { title: 'Travel', href: '/men/bags/travel', slug: ['men', 'bags', 'travel'] },
          { title: 'Small', href: '/men/bags/small', slug: ['men', 'bags', 'small'] },
          { title: 'Work', href: '/men/bags/work', slug: ['men', 'bags', 'work'] }
        ]
      },
      {
        title: 'Apparel',
        href: '/men/apparel',
        slug: ['men', 'apparel'],
        children: [
          { title: 'Tops', href: '/men/apparel/tops', slug: ['men', 'apparel', 'tops'] },
          { title: 'Bottoms', href: '/men/apparel/bottoms', slug: ['men', 'apparel', 'bottoms'] },
          { title: 'Outer', href: '/men/apparel/outer', slug: ['men', 'apparel', 'outer'] },
          { title: 'Lounge', href: '/men/apparel/lounge', slug: ['men', 'apparel', 'lounge'] }
        ]
      },
      {
        title: 'Shoes',
        href: '/men/shoes',
        slug: ['men', 'shoes'],
        children: [
          { title: 'Sneakers', href: '/men/shoes/sneakers', slug: ['men', 'shoes', 'sneakers'] },
          { title: 'Boots', href: '/men/shoes/boots', slug: ['men', 'shoes', 'boots'] },
          { title: 'Sandals', href: '/men/shoes/sandals', slug: ['men', 'shoes', 'sandals'] },
          { title: 'Formal', href: '/men/shoes/formal', slug: ['men', 'shoes', 'formal'] }
        ]
      },
      {
        title: 'Accessories',
        href: '/men/accessories',
        slug: ['men', 'accessories'],
        children: [
          { title: 'Belts', href: '/men/accessories/belts', slug: ['men', 'accessories', 'belts'] },
          { title: 'Scarves', href: '/men/accessories/scarves', slug: ['men', 'accessories', 'scarves'] },
          { title: 'Headwear', href: '/men/accessories/headwear', slug: ['men', 'accessories', 'headwear'] },
          { title: 'Umbrellas', href: '/men/accessories/umbrellas', slug: ['men', 'accessories', 'umbrellas'] }
        ]
      }
    ]
  },
  {
    title: 'Jewellery',
    href: '/jewellery',
    slug: ['jewellery'],
    groups: [
      {
        title: 'Curations',
        href: '/jewellery',
        slug: ['jewellery'],
        children: [
          { title: 'Women', href: '/jewellery/women', slug: ['jewellery', 'women'] },
          { title: 'Men', href: '/jewellery/men', slug: ['jewellery', 'men'] }
        ]
      }
    ]
  },
  {
    title: 'Sale',
    href: '/sale',
    slug: ['sale']
  },
  {
    title: 'Search',
    href: '/search'
  }
];

const countForSlug = (products: NormalizedProduct[], slug?: string[]) => {
  if (!slug) return products.length;
  const definition = getCatalogDefinition(slug);
  if (!definition) return 0;
  return products.filter((product) => definition.rule(product)).length;
};

<<<<<<< HEAD
export const buildNavigation = (products: ShopifyProduct[]): NavItem[] => {
  if (!products || products.length === 0) {
    return BASE_NAVIGATION;
  }

=======
type NormalizedProduct = ReturnType<typeof normalizeProducts>[number];

export const buildNavigation = (products: ShopifyProduct[]): NavItem[] => {
>>>>>>> origin/main
  const normalized = normalizeProducts(products);

  return BASE_NAVIGATION.map((item) => {
    const groups = item.groups
      ?.map((group) => {
        const children = group.children?.filter((child) => countForSlug(normalized, child.slug) > 0);
        if (children && children.length === 0) {
          return null;
        }
        if (group.slug && countForSlug(normalized, group.slug) === 0 && (!children || children.length === 0)) {
          return null;
        }
        return {
          ...group,
          children
        };
      })
      .filter(Boolean) as NavGroup[] | undefined;

    if (item.groups && (!groups || groups.length === 0)) {
      return null;
    }
    if (!item.groups && item.slug && countForSlug(normalized, item.slug) === 0 && item.title !== 'Search') {
      return null;
    }

    return {
      ...item,
      groups
    };
  }).filter(Boolean) as NavItem[];
};

export const NAVIGATION = BASE_NAVIGATION;
