import ProductCard from './ProductCard';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductGridProps {
  products: ShopifyProduct[];
  emptyState?: React.ReactNode;
}

export default function ProductGrid({ products, emptyState }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-charcoal/20 bg-white/60 p-12 text-center text-sm text-charcoal/60">
        {emptyState ?? 'No products found.'}
      </div>
    );
  }

  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 2} />
      ))}
    </div>
  );
}
