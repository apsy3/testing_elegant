import Container from '@/components/Container';
import CatalogFilters from '@/components/CatalogFilters';
import ProductGrid from '@/components/ProductGrid';
import { listProducts } from '@/lib/shopify';
<<<<<<< HEAD
import { normalizeProducts, type FilterKey } from '@/lib/catalog';
import {
  applyFilters,
  parseFiltersFromSearchParams,
  parseQuery,
  parseSort,
  type SortSpec
} from '@/lib/search';
import {
  buildFilterGroupDisplay,
  buildSearchItems,
  filterAllowedKeys,
  toURLSearchParams
} from '@/lib/search-helpers';
=======
import { normalizeProducts, type FilterKey } from '@/lib/taxonomy';
import {
  applyFilters,
  buildFilterGroups,
  parseFiltersFromSearchParams,
  parseQuery,
  parseSort
} from '@/lib/search';
>>>>>>> origin/main

export const dynamic = 'force-dynamic';

const FILTER_KEYS: Array<FilterKey | 'price'> = ['material', 'color', 'size', 'occasion', 'price'];

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const products = await listProducts();
  const normalized = normalizeProducts(products);
<<<<<<< HEAD
  const params = toURLSearchParams(searchParams);
  const rawFilters = parseFiltersFromSearchParams(params);
  const filters = filterAllowedKeys(rawFilters, FILTER_KEYS);
  const query = parseQuery(params);
  let sort = parseSort(params);
  if (sort.key === 'relevance') {
    sort = { key: 'new', dir: 'desc' } as SortSpec;
  }

  const searchableItems = buildSearchItems(normalized, FILTER_KEYS);
  const filteredSearchItems = applyFilters(searchableItems, { query, sort, filters });
  const productMap = new Map(normalized.map((product) => [String(product.id), product] as const));
  const filteredProducts = filteredSearchItems
    .map((item) => productMap.get(String(item.id)))
    .filter((product): product is ReturnType<typeof normalizeProducts>[number] => Boolean(product));
  const groups = buildFilterGroupDisplay(searchableItems, FILTER_KEYS);
=======
  const filters = parseFiltersFromSearchParams(searchParams, FILTER_KEYS);
  const queryValue = typeof searchParams.q === 'string'
    ? searchParams.q
    : Array.isArray(searchParams.q)
      ? searchParams.q[0]
      : undefined;
  const query = parseQuery(queryValue);
  const sort = parseSort(typeof searchParams.sort === 'string' ? searchParams.sort : undefined);
  const filtered = applyFilters(normalized, { query, sort, filters }, FILTER_KEYS);
  const groups = buildFilterGroups(normalized, FILTER_KEYS, filters).filter(
    (group) => group.options.length > 0
  );
>>>>>>> origin/main

  return (
    <div className="pb-24">
      <Container className="space-y-12 pt-12">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Search</p>
          <h1 className="font-display text-4xl text-charcoal">Find your next heirloom</h1>
          <p className="text-sm text-charcoal/60">
            Explore the entire maison and filter by material, color, or occasion.
          </p>
        </header>

        <CatalogFilters
          groups={groups}
          initialQuery={query}
          initialSort={sort}
          activeFilters={filters}
        />

        <ProductGrid
<<<<<<< HEAD
          products={filteredProducts}
=======
          products={filtered}
>>>>>>> origin/main
          emptyState="No pieces match your query yet. Adjust filters or try another search."
        />
      </Container>
    </div>
  );
}
