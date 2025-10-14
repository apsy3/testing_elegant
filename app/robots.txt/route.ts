<<<<<<< HEAD
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heritage-atelier.example';

export function GET(): Response {
  const lines = [`User-agent: *`, `Allow: /`, `Sitemap: ${siteUrl}/sitemap.xml`];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, max-age=86400'
    }
=======
// app/robots.txt/route.ts
export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
  const body = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`;
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
>>>>>>> origin/main
  });
}
