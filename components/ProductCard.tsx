import Link from 'next/link';
import Image from 'next/image';
import type { ShopifyProduct } from '@/lib/shopify';
import Price from './Price';
import Badge from './Badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: ShopifyProduct;
  priority?: boolean;
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch
      className="group block overflow-hidden rounded-3xl border border-charcoal/5 bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-fog">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage}
            alt={product.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm uppercase tracking-widest text-charcoal/40">
            Image coming soon
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.tags.includes('new') && <Badge>New Arrival</Badge>}
          {product.tags.includes('trending') && <Badge variant="soft">Trending</Badge>}
        </div>
      </div>
      <div className="space-y-2 p-6">
        <h3 className={cn('text-lg font-semibold text-charcoal transition-colors duration-200 group-hover:text-gold')}>{product.title}</h3>
        <Price amount={product.priceRange.min} currencyCode={product.priceRange.currencyCode} />
      </div>
    </Link>
  );
}
