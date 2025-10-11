import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/Button';
import { listProducts, productsByCollection } from '@/lib/shopify';
import { HERO_IMAGE_URL } from '@/lib/config';
<<<<<<< HEAD
import { normalizeProducts } from '@/lib/catalog';
=======
import { normalizeProducts } from '@/lib/taxonomy';
>>>>>>> 1b3fbaf (fix: align search utilities with shared exports)

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [rawProducts, collectionProducts] = await Promise.all([
    listProducts(),
    productsByCollection('editorial-trending')
  ]);

  const normalized = normalizeProducts(rawProducts);
  const heroSource = collectionProducts.length ? normalizeProducts(collectionProducts) : normalized;
  const heroProducts = heroSource.filter((product) => product.isNew).slice(0, 6);
  const trendingProducts = normalized
    .filter((product) => product.trending.bestsellers || product.trending.mostWanted)
    .slice(0, 6);
  const saleHighlights = normalized.filter((product) => product.isSale).slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden bg-fog">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury textile background"
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
        </div>
        <Container className="relative grid items-center gap-12 py-24 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">New Curation</p>
            <h1 className="font-display text-5xl leading-tight text-charcoal md:text-6xl">
              Contemporary silhouettes crafted by India’s heritage ateliers.
            </h1>
            <p className="max-w-xl text-lg text-charcoal/70">
              Discover limited edition saris, jewels, and ready-to-wear pieces with impeccable
              craftsmanship, curated for discerning collectors.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/new/all" prefetch>
                  Explore New Arrivals
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/(marketing)/about" prefetch>
                  Meet the Maison
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[3rem] shadow-soft">
            <Image
              src={HERO_IMAGE_URL}
              alt="Model wearing handcrafted attire"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-charcoal">Featured Heirlooms</h2>
              <p className="text-sm text-charcoal/60">
                Curated edit of rare finds and soon-to-sell-out treasures.
              </p>
            </div>
            <Link href="/women" className="text-sm uppercase tracking-widest text-charcoal/60 hover:text-gold" prefetch>
              View the edit
            </Link>
          </div>
          <ProductGrid products={heroProducts.length ? heroProducts : normalized.slice(0, 6)} />
        </Container>
      </section>

      <section className="bg-fog/60 py-20">
        <Container className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-charcoal">Crafted with narrative</h2>
            <p className="text-base text-charcoal/70">
              We partner with independent ateliers championing slow production. Each piece is
              numbered, authenticated, and archived to ensure provenance for generations.
            </p>
            <Link href="/(marketing)/about" className="text-sm uppercase tracking-widest text-gold" prefetch>
              Discover our story →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="font-display text-xl text-charcoal">Artisan First</h3>
              <p className="mt-3 text-sm text-charcoal/70">
                Direct collaborations ensure fair patronage, reinvesting 60% of proceeds back into the
                craft communities.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="font-display text-xl text-charcoal">Considered Luxury</h3>
              <p className="mt-3 text-sm text-charcoal/70">
                Limited production runs, natural materials, and mindful packaging reduce environmental
                footprint.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-charcoal">Trending Now</h2>
              <p className="text-sm text-charcoal/60">Pieces our collectors can’t stop talking about.</p>
            </div>
            <Link href="/trending/bestsellers" className="text-sm uppercase tracking-widest text-charcoal/60 hover:text-gold" prefetch>
              Shop trending
            </Link>
          </div>
          <ProductGrid products={trendingProducts.slice(0, 6)} emptyState="Check back soon for new releases." />
        </Container>
      </section>

      <section>
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-charcoal">Private Sale Highlights</h2>
              <p className="text-sm text-charcoal/60">Exclusive pricing for patrons while stocks last.</p>
            </div>
            <Link href="/sale" className="text-sm uppercase tracking-widest text-charcoal/60 hover:text-gold" prefetch>
              Enter the salon
            </Link>
          </div>
          <ProductGrid
            products={saleHighlights}
            emptyState="Sale items refresh frequently—check back soon."
          />
        </Container>
      </section>
    </div>
  );
}
