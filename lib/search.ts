import type { ShopifyProduct } from './shopify';

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

interface SearchOptions {
  query?: string;
  tag?: string;
  sort?: SortOption;
}

function matchesQuery(product: ShopifyProduct, query: string) {
  const haystack = `${product.title} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function filterProducts(products: ShopifyProduct[], options: SearchOptions): ShopifyProduct[] {
  const { query, tag } = options;

  return products.filter((product) => {
    const queryMatch = query ? matchesQuery(product, query) : true;
    const tagMatch = tag ? product.tags.includes(tag) : true;
    return queryMatch && tagMatch;
  });
}

export function sortProducts(products: ShopifyProduct[], sort: SortOption): ShopifyProduct[] {
  if (sort === 'price-asc') {
    return [...products].sort((a, b) => a.priceRange.min - b.priceRange.min);
  }
  if (sort === 'price-desc') {
    return [...products].sort((a, b) => b.priceRange.min - a.priceRange.min);
  }

  // newest by updatedAt
  return [...products].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function searchProducts(products: ShopifyProduct[], options: SearchOptions): ShopifyProduct[] {
  const filtered = filterProducts(products, options);
  const sortOption = options.sort ?? 'newest';
  return sortProducts(filtered, sortOption);
}
