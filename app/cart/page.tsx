<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
import { Suspense } from 'react';
import Container from '@/components/Container';
import CartPageClient from '@/components/CartPageClient';
import Skeleton from '@/components/Skeleton';

export const dynamic = 'force-dynamic';
<<<<<<< HEAD
=======
import Container from '@/components/Container';
import CartPageClient from '@/components/CartPageClient';
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)

export default function CartPage() {
  return (
    <div className="pb-24">
      <Container className="space-y-12 pt-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">Your Selection</p>
          <h1 className="mt-4 font-display text-4xl text-charcoal">Cart</h1>
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
        <Suspense fallback={<CartFallback />}> 
          <CartPageClient />
        </Suspense>
=======
        <CartPageClient />
>>>>>>> origin/main
=======
        <Suspense fallback={<CartFallback />}> 
          <CartPageClient />
        </Suspense>
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
      </Container>
    </div>
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)

function CartFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-40 rounded-3xl" />
      <Skeleton className="h-32 rounded-3xl" />
    </div>
  );
}
<<<<<<< HEAD
=======
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
