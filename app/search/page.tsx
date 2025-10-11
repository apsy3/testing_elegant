import Container from '@/components/Container';
import CatalogFilters from '@/components/CatalogFilters';
import ProductGrid from '@/components/ProductGrid';
import { listProducts } from '@/lib/shopify';
import { normalizeProducts, type FilterKey } from '@/lib/taxonomy';
import {
  applyFilters,
  buildFilterGroups,
  parseFiltersFromSearchParams,
  parseQuery,
  parseSort
} from '@/lib/search';

export const dynamic = 'force-dynamic';

const FILTER_KEYS: Array<FilterKey | 'price'> = ['material', 'color', 'size', 'occasion', 'price'];

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const products = await listProducts();
  const normalized = normalizeProducts(products);
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
          products={filtered}
          emptyState="No pieces match your query yet. Adjust filters or try another search."
        />
      </Container>
    </div>
  );
}
