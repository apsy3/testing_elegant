// app/robots.txt/route.ts
export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
  const body = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`;
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
