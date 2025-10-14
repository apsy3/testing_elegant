import Image from 'next/image';
import Link from 'next/link';
import Price from './Price';
import Badge from './Badge';
import { cn } from '@/lib/utils';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.featuredImage ?? product.images[0] ?? null;
  const isNew = product.tags.includes('new');

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block overflow-hidden rounded-[2.5rem] bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1"
      prefetch
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-fog" />
        )}
        {isNew && (
          <div className="absolute left-4 top-4">
            <Badge>New</Badge>
          </div>
        )}
      </div>
      <div className="space-y-2 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">{product.tags[0] ?? 'Artisan'}</p>
        <h3 className="font-display text-xl text-charcoal">{product.title}</h3>
        <Price amount={product.priceRange.min} currencyCode={product.priceRange.currencyCode} />
      </div>
    </Link>
  );
}
