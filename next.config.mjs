import { createRequire } from 'module';

const require = createRequire(import.meta.url);

<<<<<<< HEAD
=======
// next.config.mjs
>>>>>>> origin/main
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
<<<<<<< HEAD
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
=======
      { protocol: 'https', hostname: '**.shopifycdn.com' },
      { protocol: 'https', hostname: '**.cdn.shopify.com' },
    ],
  },
>>>>>>> origin/main
};

export default nextConfig;
