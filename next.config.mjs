import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.shopifycdn.com' },
      { protocol: 'https', hostname: '**.cdn.shopify.com' },
    ],
  },
};

export default nextConfig;
