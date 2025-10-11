<<<<<<< HEAD
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heritage-atelier.example';

export function GET(): Response {
  const lines = [`User-agent: *`, `Allow: /`, `Sitemap: ${siteUrl}/sitemap.xml`];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, max-age=86400'
    }
  });
=======
import type { MetadataRoute } from 'next';

export function GET(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heritage-atelier.example';

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`
  };
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
}
