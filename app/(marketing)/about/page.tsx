import Container from '@/components/Container';
import Image from 'next/image';

<<<<<<< HEAD
<<<<<<< HEAD
export const dynamic = 'force-dynamic';
=======
export const revalidate = 3600;
>>>>>>> origin/main
=======
export const dynamic = 'force-dynamic';
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)

export default function AboutPage() {
  return (
    <div className="bg-fog/60 pb-24">
      <Container className="grid gap-16 py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Our Maison</p>
          <h1 className="font-display text-4xl text-charcoal">Honouring heritage, crafting the future</h1>
          <p className="text-base text-charcoal/70">
            Heritage Atelier is a slow-luxury collective showcasing India’s most exceptional artisans.
            We curate limited-run collections with provenance, storytelling, and respect for the craft
            communities who bring each piece to life.
          </p>
          <p className="text-base text-charcoal/70">
            Every purchase sustains workshops across Jaipur, Varanasi, and Hyderabad, ensuring
            generational skills remain vibrant. Our atelier partners are co-authors—featured prominently
            across our storytelling, and remunerated with transparent profit sharing.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <Stat label="Artisans represented" value="28" />
            <Stat label="Cities across India" value="9" />
            <Stat label="Hours to craft each piece" value="120+" />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[3rem] shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=1200&q=80"
            alt="Artisan weaving handloom fabric"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Container>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-charcoal/10 bg-white p-6 text-center shadow-soft">
      <p className="font-display text-2xl text-charcoal">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-charcoal/50">{label}</p>
    </div>
  );
}
