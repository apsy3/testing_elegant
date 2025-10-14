import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import ProductGrid from '@/components/ProductGrid';
import Price from '@/components/Price';
import AddToCartButton from '@/components/AddToCartButton';
import Skeleton from '@/components/Skeleton';
import { getProductByHandle, listProducts } from '@/lib/shopify';
import { SITE_CONFIG } from '@/lib/config';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await listProducts()).filter(
    (item) => item.handle !== product.handle && item.tags.some((tag) => product.tags.includes(tag))
  );

  const primaryImage = product.featuredImage ?? product.images[0] ?? null;

  return (
    <div className="pb-24">
      <Container className="space-y-16 pt-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] bg-fog">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.altText ?? product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              ) : (
                <Skeleton className="h-full w-full" />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((image) => (
                  <div key={image.url} className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={image.url}
                      alt={image.altText ?? product.title}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Limited release</p>
              <h1 className="font-display text-4xl text-charcoal md:text-5xl">{product.title}</h1>
              <Price amount={product.priceRange.min} currencyCode={product.priceRange.currencyCode} />
            </div>

            <p className="text-base leading-relaxed text-charcoal/70">{product.description}</p>

            <AddToCartButton
              product={product}
              variant={product.variants[0]}
              className="w-full md:w-auto"
            />

            <div className="space-y-3 text-sm text-charcoal/70">
              <h2 className="font-semibold uppercase tracking-widest text-charcoal">Details</h2>
              <ul className="list-disc space-y-2 pl-5">
                {product.tags.slice(0, 6).map((tag) => (
                  <li key={tag}>{tag.replace(/^[^:]+:/, '')}</li>
                ))}
              </ul>
              <p>
                Need assistance? <Link href="/contact" className="text-gold">Contact concierge</Link> for bespoke
                guidance.
              </p>
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-charcoal">You may also love</h2>
            <Link href="/catalog" className="text-sm uppercase tracking-widest text-charcoal/60 hover:text-gold">
              View catalog
            </Link>
          </div>
          <ProductGrid products={relatedProducts.slice(0, 4)} emptyState="Explore the full catalog for more." />
        </section>

        <section className="rounded-3xl bg-fog/70 p-8 text-sm text-charcoal/70">
          <h3 className="font-display text-xl text-charcoal">Care & provenance</h3>
          <p className="mt-3">
            Each piece is authenticated and archived. Complimentary annual maintenance ensures your investment
            retains its heirloom quality.
          </p>
          <p className="mt-2">
            Prices shown in {SITE_CONFIG.currency}. Duties & taxes calculated at checkout. Delivery timelines shared
            post purchase.
          </p>
        </section>
      </Container>
    </div>
  );
}
