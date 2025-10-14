import Container from '@/components/Container';
import ProductGrid from '@/components/ProductGrid';
import { listProducts } from '@/lib/shopify';
import { applyFilters, parseFiltersFromSearchParams, parseQuery, parseSort } from '@/lib/search';

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export const revalidate = 60;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => params.append(key, val));
    } else if (value) {
      params.set(key, value);
    }
  });

  const query = parseQuery(params);
  const sort = parseSort(params);
  const filters = parseFiltersFromSearchParams(params);

  const products = await listProducts();
  const results = applyFilters(
    products.map((product) => ({
      ...product,
      price: product.priceRange.min
    })),
    { query, filters, sort }
  );

  return (
    <div className="pb-24">
      <Container className="space-y-12 pt-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Search</p>
          <h1 className="mt-4 font-display text-4xl text-charcoal">
            {query ? `Results for “${query}”` : 'All products'}
          </h1>
          <p className="mt-3 text-sm text-charcoal/60">{results.length} items found</p>
        </div>
        <ProductGrid products={results} emptyState="Try adjusting your filters." />
      </Container>
    </div>
  );
}
