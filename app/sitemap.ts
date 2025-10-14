<<<<<<< HEAD
import type { MetadataRoute } from 'next';
import { listProducts } from '@/lib/shopify';
import { allCollectionSlugs } from '@/lib/catalog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heritage-atelier.example';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts();

  const productEntries = products.map((product) => ({
    url: `${siteUrl}/product/${product.handle}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date()
  }));

  const collectionEntries = allCollectionSlugs().map((segments) => ({
    url: `${siteUrl}/${segments.join('/')}`,
    lastModified: new Date()
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/cart`, lastModified: new Date() },
    { url: `${siteUrl}/search`, lastModified: new Date() },
    { url: `${siteUrl}/(marketing)/about`, lastModified: new Date() },
    ...collectionEntries,
    ...productEntries
  ];
=======
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { listProducts } from '@/lib/shopify'

// Force runtime execution so Netlify doesn't try to prefetch at build time
export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

type ProductLite = { handle: string; updatedAt?: string | Date }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: ProductLite[] = []
  try {
    // Ensure your listProducts returns at least: handle, updatedAt
    products = await listProducts()
  } catch (err) {
    // Fail open: return only the base routes if Shopify is unreachable
    console.error('sitemap: listProducts failed; returning base routes only')
  }

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now },
    { url: `${siteUrl}/catalog`, lastModified: now },
    { url: `${siteUrl}/cart`, lastModified: now },
    { url: `${siteUrl}/about`, lastModified: now }, // <-- fixed (no route group in URL)
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/product/${p.handle}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
  }))

  return [...staticRoutes, ...productRoutes]
>>>>>>> origin/main
}
