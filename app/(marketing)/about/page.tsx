import Image from 'next/image';
import Container from '@/components/Container';

export const metadata = {
  title: 'About'
};

export default function AboutPage() {
  return (
    <div className="bg-fog/40 pb-24">
      <Container className="space-y-16 pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Maison Heritage</p>
            <h1 className="font-display text-4xl text-charcoal md:text-5xl">
              A dialogue between India’s storied craft houses and modern luxury seekers.
            </h1>
            <p className="text-base leading-relaxed text-charcoal/70">
              Heritage Atelier curates limited edition objects handmade by master artisans. We partner with
              ateliers across India, preserving age-old techniques while refining silhouettes for contemporary
              wardrobes.
            </p>
            <p className="text-base leading-relaxed text-charcoal/70">
              Each piece is authenticated, archived, and accompanied by a provenance dossier. Our concierge team
              provides bespoke styling, gifting, and aftercare services to ensure your acquisition becomes a cherished
              heirloom.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[3rem] shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
              alt="Artisan craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="grid gap-10 rounded-3xl bg-white/80 p-12 shadow-soft md:grid-cols-3">
          <div>
            <h2 className="font-display text-xl text-charcoal">Craft lineage</h2>
            <p className="mt-3 text-sm text-charcoal/70">
              Collaborations span Kutch embroidery, Benarasi weaving, Jaipur jewellery, and Ponduru khadi.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-charcoal">Slow luxury</h2>
            <p className="mt-3 text-sm text-charcoal/70">
              Limited production runs ensure fair wages, mindful resources, and heirloom longevity.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-charcoal">Collector services</h2>
            <p className="mt-3 text-sm text-charcoal/70">
              Concierge fittings, archival documentation, and restoration keep your pieces pristine.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
