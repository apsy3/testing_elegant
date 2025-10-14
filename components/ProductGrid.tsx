import ProductCard from './ProductCard';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductGridProps {
  products: ShopifyProduct[];
  emptyState?: string;
}

export default function ProductGrid({ products, emptyState }: ProductGridProps) {
  if (!products.length && emptyState) {
    return <p className="text-center text-sm uppercase tracking-[0.3em] text-charcoal/40">{emptyState}</p>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
