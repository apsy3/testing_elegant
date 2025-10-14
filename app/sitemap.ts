import type { MetadataRoute } from 'next';
import { listProducts } from '@/lib/shopify';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heritage-atelier.example';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts();

  const productEntries = products.map((product) => ({
    url: `${siteUrl}/product/${product.handle}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date()
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/catalog`, lastModified: new Date() },
    { url: `${siteUrl}/cart`, lastModified: new Date() },
    { url: `${siteUrl}/(marketing)/about`, lastModified: new Date() },
    ...productEntries
  ];
}
