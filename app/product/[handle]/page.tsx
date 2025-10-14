import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import ProductGrid from '@/components/ProductGrid';
import AddToCartButton from '@/components/AddToCartButton';
import Price from '@/components/Price';
import { getProductByHandle, listProducts } from '@/lib/shopify';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import {
  breadcrumbsForSlug,
  listCatalogDefinitions,
  normalizeProducts,
  type CatalogDefinition
} from '@/lib/catalog';

export const dynamic = 'force-dynamic';

type ProductPageProps = {
  params: {
    handle: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return {
      title: 'Product not found'
    };
  }

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.featuredImage ? [{ url: product.featuredImage }] : undefined
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const allProducts = await listProducts();
  const normalized = normalizeProducts(allProducts);
  const normalizedProduct = normalized.find((p) => p.handle === product.handle);

  const matchedDefinitions = normalizedProduct
    ? listCatalogDefinitions()
        .filter((definition) => definition.rule(normalizedProduct))
        .sort((a, b) => b.slug.length - a.slug.length)
    : [];

  const primaryDefinition: CatalogDefinition | undefined = matchedDefinitions[0];
  const breadcrumbs = primaryDefinition ? breadcrumbsForSlug(primaryDefinition.slug) : [];

  const related = primaryDefinition
    ? normalized
        .filter((candidate) => candidate.handle !== product.handle && primaryDefinition.rule(candidate))
        .slice(0, 4)
    : normalized.filter((candidate) => candidate.handle !== product.handle).slice(0, 4);

  const descriptionParagraphs = product.description.split(/\n{2,}/).filter(Boolean);
  const materialsLine = product.description
    .split('\n')
    .find((line) => line.toLowerCase().startsWith('materials:'));
  const materialList = materialsLine?.replace(/materials:/i, '').split(',').map((item) => item.trim());

  return (
    <div className="pb-24">
      <Container className="space-y-10 py-12">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.3em] text-charcoal/50">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-gold" prefetch>
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-2">
                <span>·</span>
                <Link href={crumb.href} className="hover:text-gold" prefetch>
                  {crumb.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span>·</span>
              <span>{product.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="grid gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] bg-fog">
              {product.featuredImage ? (
              <Image
                src={product.featuredImage}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, (max-width:1200px) 60vw, 40vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm uppercase tracking-widest text-charcoal/40">
                Image coming soon
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image) => (
              <div key={image.url} className="relative aspect-square overflow-hidden rounded-2xl bg-fog">
                <Image src={image.url} alt={image.altText ?? product.title} fill className="object-cover" sizes="120px" />
              </div>
            ))}
          </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-charcoal/50">{SITE_CONFIG.name}</p>
            <h1 className="font-display text-4xl text-charcoal">{product.title}</h1>
            <Price amount={product.priceRange.min} currencyCode={product.priceRange.currencyCode} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-charcoal/80">
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {materialList && materialList.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-charcoal/60">Materials & Care</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-charcoal/70">
                {materialList.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
            </div>
          )}
          <AddToCartButton product={product} />
        </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-20 space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-charcoal">You may also like</h2>
              <p className="text-sm text-charcoal/60">Selected for their complementary story and craft.</p>
            </div>
          </div>
          <ProductGrid products={related} />
        </Container>
      )}
    </div>
  );
}
