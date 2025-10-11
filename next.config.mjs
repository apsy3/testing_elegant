import { createRequire } from 'module';

const require = createRequire(import.meta.url);

<<<<<<< HEAD
<<<<<<< HEAD
=======
// next.config.mjs
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
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
<<<<<<< HEAD
=======
      { protocol: 'https', hostname: '**.shopifycdn.com' },
      { protocol: 'https', hostname: '**.cdn.shopify.com' },
    ],
  },
>>>>>>> origin/main
=======
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
};

export default nextConfig;
