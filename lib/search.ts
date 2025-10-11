import type { NormalizedProduct, FilterKey } from './taxonomy';

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

export interface ActiveFilters {
  [key: string]: string[];
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  key: FilterKey | 'price';
  label: string;
  options: FilterOption[];
}

export interface SearchOptions {
  query?: string;
  sort?: SortOption;
  filters?: ActiveFilters;
}

const FILTER_LABELS: Record<FilterKey | 'price', string> = {
  material: 'Material',
  color: 'Color',
  size: 'Size',
  price: 'Price',
  occasion: 'Occasion',
  capacity: 'Capacity (L)',
  'device-fit': 'Device Fit',
  waterproof: 'Waterproof',
  wheels: 'Wheels',
  width: 'Width',
  closure: 'Closure',
  'heel-height': 'Heel Height',
  fit: 'Fit',
  length: 'Length',
  fabric: 'Fabric',
  season: 'Season'
};

const PRICE_BUCKETS: Array<{
  value: string;
  label: string;
  predicate: (price: number) => boolean;
}> = [
  { value: 'under-10000', label: 'Under ₹10,000', predicate: (price) => price < 10000 },
  { value: '10000-25000', label: '₹10,000 – ₹25,000', predicate: (price) => price >= 10000 && price < 25000 },
  { value: '25000-50000', label: '₹25,000 – ₹50,000', predicate: (price) => price >= 25000 && price < 50000 },
  { value: 'over-50000', label: '₹50,000+', predicate: (price) => price >= 50000 }
];

const labelize = (value: string) => value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const unique = <T,>(values: T[]): T[] => Array.from(new Set(values));

const extractValues = (product: NormalizedProduct, key: FilterKey | 'price'): string[] => {
  if (key === 'price') {
    const price = product.priceRange.min;
    const bucket = PRICE_BUCKETS.find((candidate) => candidate.predicate(price));
    return bucket ? [bucket.value] : [];
  }

  const attributes = product.attributes;
  switch (key) {
    case 'occasion':
      return Array.from(product.occasions);
    default:
      return attributes[key] ?? [];
  }
};

const matchesFilter = (
  product: NormalizedProduct,
  activeFilters: ActiveFilters,
  key: FilterKey | 'price'
) => {
  const selected = activeFilters[key];
  if (!selected || selected.length === 0) {
    return true;
  }
  const productValues = extractValues(product, key);
  if (productValues.length === 0) {
    return false;
  }
  return selected.some((value) => productValues.includes(value));
};

const matchesQuery = (product: NormalizedProduct, query?: string) => {
  if (!query) {
    return true;
  }
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) {
    return true;
  }
  return product.normalizedText.includes(cleaned);
};

export function applyFilters(
  products: NormalizedProduct[],
  { query, sort = 'newest', filters = {} }: SearchOptions,
  filterKeys: Array<FilterKey | 'price'>
): NormalizedProduct[] {
  const filtered = products.filter((product) => {
    if (!matchesQuery(product, query)) {
      return false;
    }
    return filterKeys.every((key) => matchesFilter(product, filters, key));
  });

  if (sort === 'price-asc') {
    return filtered.sort((a, b) => a.priceRange.min - b.priceRange.min);
  }
  if (sort === 'price-desc') {
    return filtered.sort((a, b) => b.priceRange.min - a.priceRange.min);
  }
  return filtered.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function buildFilterGroups(
  products: NormalizedProduct[],
  filterKeys: Array<FilterKey | 'price'>,
  activeFilters: ActiveFilters = {}
): FilterGroup[] {
  return filterKeys.map((key) => {
    const optionsWithCounts: Record<string, number> = {};
    products.forEach((product) => {
      const values = extractValues(product, key);
      values.forEach((value) => {
        optionsWithCounts[value] = (optionsWithCounts[value] ?? 0) + 1;
      });
    });

    const options: FilterOption[] = Object.entries(optionsWithCounts)
      .map(([value, count]) => ({
        value,
        label: key === 'price'
          ? PRICE_BUCKETS.find((bucket) => bucket.value === value)?.label ?? labelize(value)
          : labelize(value),
        count
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    const selected = activeFilters[key] ?? [];
    const selectedOptions = selected
      .filter((value) => !optionsWithCounts[value])
      .map((value) => ({ value, label: labelize(value), count: 0 }));

    return {
      key,
      label: FILTER_LABELS[key],
      options: unique([...selectedOptions, ...options])
    };
  });
}

export function parseFiltersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
  filterKeys: Array<FilterKey | 'price'>
): ActiveFilters {
  const active: ActiveFilters = {};
  filterKeys.forEach((key) => {
    const raw = searchParams[key];
    if (!raw) return;
    const values = Array.isArray(raw) ? raw : raw.split(',');
    active[key] = values.filter(Boolean);
  });
  return active;
}

export function parseSort(value?: string): SortOption {
  if (value === 'price-asc' || value === 'price-desc') {
    return value;
  }
  return 'newest';
}

export function parseQuery(value?: string) {
  return value ?? '';
}

export const serializeFilters = (filters: ActiveFilters): URLSearchParams => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, values]) => {
    if (!values || values.length === 0) return;
    params.set(key, values.join(','));
  });
  return params;
};
