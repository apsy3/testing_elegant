import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import CatalogFilters from '@/components/CatalogFilters';
import ProductGrid from '@/components/ProductGrid';
import { listProducts } from '@/lib/shopify';
import {
  breadcrumbsForSlug,
  productsForSlug,
  type NormalizedProduct,
  type CatalogDefinition,
  type FilterKey
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
} from '@/lib/catalog';
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
<<<<<<< HEAD
=======
} from '@/lib/taxonomy';
import {
  applyFilters,
  buildFilterGroups,
  parseFiltersFromSearchParams,
  parseQuery,
  parseSort
} from '@/lib/search';
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
  params: { slug?: string[] };
  searchParams: Record<string, string | string[] | undefined>;
}

const formatSectionLabel = (definition: CatalogDefinition) => {
  switch (definition.section) {
    case 'women':
      return 'Women';
    case 'men':
      return 'Men';
    case 'jewellery':
      return 'Jewellery';
    case 'new':
      return 'New';
    case 'trending':
      return 'Trending';
    case 'sale':
      return 'Sale';
    default:
      return 'Collection';
  }
};

const uniqueFilterKeys = (definition: CatalogDefinition) => {
  const keys = new Set<string>(definition.allowedFilters);
  keys.add('price');
  return Array.from(keys) as Array<FilterKey | 'price'>;
};

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const slug = params.slug ?? [];
  const products = await listProducts();
  const result = productsForSlug(products, slug);

  if (!result) {
    notFound();
  }

  const { definition, items } = result as { definition: CatalogDefinition; items: NormalizedProduct[] };
  const filterKeys = uniqueFilterKeys(definition);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
  const urlSearchParams = toURLSearchParams(searchParams);
  const rawFilters = parseFiltersFromSearchParams(urlSearchParams);
  const filters = filterAllowedKeys(rawFilters, filterKeys);
  const query = parseQuery(urlSearchParams);
  let sort = parseSort(urlSearchParams);
  if (sort.key === 'relevance') {
    sort = { key: 'new', dir: 'desc' } as SortSpec;
  }

  const searchableItems = buildSearchItems(items, filterKeys);
  const filteredSearchItems = applyFilters(searchableItems, { query, sort, filters });
  const productMap = new Map(items.map((product) => [String(product.id), product] as const));
  const filteredProducts = filteredSearchItems
    .map((item) => productMap.get(String(item.id)))
    .filter((product): product is NormalizedProduct => Boolean(product));
  const groups = buildFilterGroupDisplay(searchableItems, filterKeys);
<<<<<<< HEAD
=======
  const activeFilters = parseFiltersFromSearchParams(searchParams, filterKeys);
  const queryValue = typeof searchParams.q === 'string'
    ? searchParams.q
    : Array.isArray(searchParams.q)
      ? searchParams.q[0]
      : undefined;
  const query = parseQuery(queryValue);
  const sort = parseSort(typeof searchParams.sort === 'string' ? searchParams.sort : undefined);
  const filtered = applyFilters(items, { query, sort, filters: activeFilters }, filterKeys);
  const groups = buildFilterGroups(items, filterKeys, activeFilters).filter(
    (group) => group.options.length > 0
  );
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
  const breadcrumbs = breadcrumbsForSlug(definition.slug);

  return (
    <div className="pb-24">
      <Container className="space-y-12 pt-12">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.3em] text-charcoal/40">
          <ol className="flex flex-wrap gap-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span>·</span>}
                <Link href={crumb.href} className="hover:text-gold" prefetch>
                  {crumb.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">{formatSectionLabel(definition)}</p>
          <h1 className="font-display text-4xl text-charcoal md:text-5xl">{definition.title}</h1>
          <p className="max-w-2xl text-sm text-charcoal/60">
            Curated selection from our {formatSectionLabel(definition).toLowerCase()} edit. Refine using materials, occasion, and craft-forward details.
          </p>
        </header>

        <CatalogFilters
          groups={groups}
          initialQuery={query}
          initialSort={sort}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
          activeFilters={filters}
        />

        <ProductGrid
          products={filteredProducts}
<<<<<<< HEAD
=======
          activeFilters={activeFilters}
        />

        <ProductGrid
          products={filtered}
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
          emptyState="No pieces match your filters yet. Adjust the facets to continue exploring."
        />
      </Container>
    </div>
  );
}
