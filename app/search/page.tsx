import Container from '@/components/Container';
import CatalogFilters from '@/components/CatalogFilters';
import ProductGrid from '@/components/ProductGrid';
import { listProducts } from '@/lib/shopify';
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

export const dynamic = 'force-dynamic';

const FILTER_KEYS: Array<FilterKey | 'price'> = ['material', 'color', 'size', 'occasion', 'price'];

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const products = await listProducts();
  const normalized = normalizeProducts(products);
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
          products={filteredProducts}
          emptyState="No pieces match your query yet. Adjust filters or try another search."
        />
      </Container>
    </div>
  );
}
