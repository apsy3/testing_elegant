// lib/search.ts
import type { ShopifyProduct } from './shopify';

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

interface SearchOptions {
  query?: string;
  tag?: string;
  sort?: SortOption;
}

/* ---------- your existing helpers ---------- */

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

/* ---------- compatibility exports used elsewhere ---------- */

// a light-weight filter map for legacy callers
export type Filters = Record<string, string[]>;

function normalizeSort(val?: string | null): SortOption {
  const v = (val || '').toLowerCase();
  if (v === 'price-asc' || v === 'price_asc') return 'price-asc';
  if (v === 'price-desc' || v === 'price_desc') return 'price-desc';
  return 'newest';
}

export function parseQuery(
  sp: URLSearchParams | { q?: string } | null | undefined
): string {
  if (!sp) return '';
  // URLSearchParams or plain object
  // @ts-expect-error runtime duck-typing
  return typeof sp.get === 'function' ? (sp as URLSearchParams).get('q') || '' : (sp as any).q || '';
}

export function parseSort(
  sp: URLSearchParams | { sort?: string } | string | null | undefined
): SortOption {
  if (!sp) return 'newest';
  if (typeof sp === 'string') return normalizeSort(sp);
  // @ts-expect-error runtime duck-typing
  const raw = typeof sp.get === 'function' ? (sp as URLSearchParams).get('sort') : (sp as any).sort;
  return normalizeSort(raw);
}

export function parseFiltersFromSearchParams(
  sp: URLSearchParams | Record<string, unknown> | null | undefined
): Filters {
  const out: Filters = {};
  if (!sp) return out;

  const entries: Array<[string, string]> = [];
  // Collect key/value pairs from URLSearchParams or plain object
  if (typeof (sp as any).entries === 'function') {
    for (const [k, v] of (sp as URLSearchParams).entries()) entries.push([k, v]);
  } else {
    for (const k of Object.keys(sp as Record<string, unknown>)) {
      const v = (sp as any)[k];
      if (v != null) entries.push([k, String(v)]);
    }
  }

  for (const [k, v] of entries) {
    if (k === 'tag' && v) {
      out.tag = [v];
      continue;
    }
    if (!k.startsWith('f.') || !v) continue;
    const key = k.slice(2); // f.color => color
    const values = v.split(',').map(s => s.trim()).filter(Boolean);
    if (values.length) out[key] = values;
  }
  return out;
}

// applyFilters: bridges legacy callers to your new filter/sort logic
export function applyFilters(
  items: ShopifyProduct[],
  opts: { query?: string; filters?: Filters; sort?: SortOption }
): ShopifyProduct[] {
  const query = opts.query ?? (opts.filters?.q?.[0] ?? '');
  const tag = opts.filters?.tag?.[0];
  const sort = opts.sort ?? 'newest';
  return searchProducts(items, { query, tag, sort });
}

// buildFilterGroups: creates facet counts from product tags (supports both "key:value" and bare tags)
export function buildFilterGroups(
  products: ShopifyProduct[]
): { key: string; options: { value: string; count: number }[] }[] {
  const tally: Record<string, Record<string, number>> = {};
  for (const p of products) {
    for (const t of p.tags || []) {
      const [key, value] = String(t).includes(':') ? String(t).split(':', 2) : ['tag', String(t)];
      if (!value) continue;
      (tally[key] ||= {});
      tally[key][value] = (tally[key][value] || 0) + 1;
    }
  }
  return Object.entries(tally).map(([key, map]) => ({
    key,
    options: Object.entries(map)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value)),
  }));
}
