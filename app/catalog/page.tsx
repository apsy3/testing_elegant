import Container from '@/components/Container';
import ProductGrid from '@/components/ProductGrid';
import CatalogFilters from '@/components/CatalogFilters';
import { listProducts } from '@/lib/shopify';
import { searchProducts } from '@/lib/search';

export const dynamic = 'force-dynamic';

type CatalogPageProps = {
  searchParams: {
    q?: string;
    tag?: string;
    sort?: string;
  };
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const products = await listProducts();
  const tags = Array.from(new Set(products.flatMap((product) => product.tags))).filter(Boolean);
  const sort = (searchParams.sort as 'newest' | 'price-asc' | 'price-desc') ?? 'newest';
  const filtered = searchProducts(products, {
    query: searchParams.q,
    tag: searchParams.tag,
    sort
  });

  return (
    <div className="pb-24">
      <Container className="space-y-12">
        <div className="pt-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">The Catalog</p>
          <h1 className="mt-4 font-display text-4xl text-charcoal">Elevated pieces for every occasion</h1>
          <p className="mt-3 text-sm text-charcoal/60">
            Filter by tags or search to uncover the perfect addition to your wardrobe.
          </p>
        </div>
        <CatalogFilters
          key={`${searchParams.q ?? ''}-${searchParams.tag ?? ''}-${sort}`}
          tags={tags}
          initialQuery={searchParams.q ?? ''}
          initialTag={searchParams.tag ?? ''}
          initialSort={sort}
        />
        <ProductGrid products={filtered} emptyState="No pieces match your search just yet." />
      </Container>
    </div>
  );
}
