import Link from 'next/link';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-white/80">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <p className="font-display text-xl text-charcoal">Heritage Atelier</p>
          <p className="text-sm text-charcoal/60">
            Contemporary curation of handcrafted Indian luxury with concierge services for discerning collectors.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Maison</h3>
          <ul className="space-y-1 text-sm text-charcoal/70">
            <li>
              <Link href="/(marketing)/about" className="hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link href="/catalog" className="hover:text-gold">
                Catalog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold">
                Concierge
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Support</h3>
          <ul className="space-y-1 text-sm text-charcoal/70">
            <li>Shipping & returns</li>
            <li>Care & restoration</li>
            <li>Gift services</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Policies</h3>
          <ul className="space-y-1 text-sm text-charcoal/70">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Cookies</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-charcoal/10 py-6 text-center text-xs uppercase tracking-[0.3em] text-charcoal/50">
        © {new Date().getFullYear()} Heritage Atelier. Crafted in India.
      </div>
    </footer>
  );
}
