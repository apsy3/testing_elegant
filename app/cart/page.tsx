import Container from '@/components/Container';
import CartPageClient from '@/components/CartPageClient';

export default function CartPage() {
  return (
    <div className="pb-24">
      <Container className="space-y-12 pt-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Your Selection</p>
          <h1 className="mt-4 font-display text-4xl text-charcoal">Cart</h1>
        </div>
        <CartPageClient />
      </Container>
    </div>
  );
}
