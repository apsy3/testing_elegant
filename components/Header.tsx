import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const HeaderClient = dynamic(() => import('./HeaderClient'), {
  ssr: false,
  suspense: true
});

export default function Header() {
  return (
    <Suspense fallback={<div className="h-20 border-b border-charcoal/10 bg-white" />}>
      <HeaderClient />
    </Suspense>
  );
}
