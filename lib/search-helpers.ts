import type { Filters } from './search';
<<<<<<< HEAD
import type { NormalizedProduct, FilterKey } from './catalog';
=======
import type { NormalizedProduct, FilterKey } from './taxonomy';
>>>>>>> 1b3fbaf (fix: align search utilities with shared exports)
import { buildFilterGroups } from './search';
import type { FilterGroup } from '@/components/CatalogFilters';

export const FILTER_LABELS: Record<string, string> = {
  material: 'Material',
  color: 'Color',
  size: 'Size',
  occasion: 'Occasion',
  price: 'Price',
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

export const PRICE_LABELS: Record<string, string> = {
  'under-10000': 'Under ₹10,000',
  '10000-25000': '₹10,000 – ₹25,000',
  '25000-50000': '₹25,000 – ₹50,000',
  'over-50000': '₹50,000+'
};

const titleize = (value: string) => value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

export const toURLSearchParams = (
  input: Record<string, string | string[] | undefined>
): URLSearchParams => {
  const params = new URLSearchParams();
  Object.entries(input).forEach(([key, rawValue]) => {
    if (typeof rawValue === 'string') {
      params.set(key, rawValue);
      return;
    }
    if (Array.isArray(rawValue)) {
      rawValue.forEach((entry) => {
        if (entry) {
          params.append(key, entry);
        }
      });
    }
  });
  return params;
};

const priceBucket = (price: number) => {
  if (price < 10000) return 'under-10000';
  if (price < 25000) return '10000-25000';
  if (price < 50000) return '25000-50000';
  return 'over-50000';
};

export const buildTagsForFilters = (
  product: NormalizedProduct,
  filterKeys: Array<FilterKey | 'price'>
) => {
  const tags = new Set<string>();
  (product.tags ?? []).forEach((tag) => {
    const normalized = tag.toLowerCase();
    if (normalized.includes(':')) {
      tags.add(normalized);
    }
  });

  filterKeys.forEach((key) => {
    switch (key) {
      case 'price': {
        const bucket = priceBucket(product.priceRange.min);
        tags.add(`price:${bucket}`);
        break;
      }
      case 'occasion': {
        product.occasions.forEach((occasion) => tags.add(`occasion:${occasion}`));
        break;
      }
      default: {
        const values = product.attributes[key];
        if (values) {
          values.forEach((value) => tags.add(`${key}:${value}`));
        }
        break;
      }
    }
  });

  return Array.from(tags);
};

export const buildSearchItems = (
  products: NormalizedProduct[],
  filterKeys: Array<FilterKey | 'price'>
) =>
  products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.priceRange.min,
    createdAt: product.createdAt,
    tags: buildTagsForFilters(product, filterKeys)
  }));

export const filterAllowedKeys = (
  filters: Filters,
  allowed: Array<FilterKey | 'price'>
): Filters => {
  const allowedSet = new Set(allowed);
  return Object.fromEntries(
    Object.entries(filters).filter(([key]) => allowedSet.has(key as FilterKey | 'price'))
  );
};

export const buildFilterGroupDisplay = (
  items: ReturnType<typeof buildSearchItems>,
  allowedKeys: Array<FilterKey | 'price'>
): FilterGroup[] => {
  const allowedSet = new Set(allowedKeys);
  return buildFilterGroups(items)
    .filter((group) => allowedSet.has(group.key as FilterKey | 'price'))
    .map((group) => ({
      key: group.key,
      label: FILTER_LABELS[group.key] ?? titleize(group.key),
      options: group.options.map((option) => ({
        value: option.value,
        count: option.count,
        label:
          group.key === 'price'
            ? PRICE_LABELS[option.value] ?? titleize(option.value)
            : titleize(option.value)
      }))
    }))
    .filter((group) => group.options.length > 0);
};
