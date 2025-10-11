<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import type { Metadata } from 'next';
=======
import type { Metadata, Viewport } from 'next';
>>>>>>> 9f14315 (fix: drop useSearchParams to unblock static build)
=======
import type { Metadata, Viewport } from 'next';
>>>>>>> e3974fd (fix: unblock static builds)
=======
import type { Metadata } from 'next';
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
import { SITE_CONFIG } from './config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://heritage-atelier.example';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name
  },
  description: SITE_CONFIG.description,
  keywords: ['luxury', 'handcrafted', 'artisans', 'india', 'shopify', 'boutique'],
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: siteUrl,
    siteName: SITE_CONFIG.name
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description
  },
  icons: {
    icon: '/icon.svg'
<<<<<<< HEAD
  }
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> e3974fd (fix: unblock static builds)

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light'
};
<<<<<<< HEAD
>>>>>>> 9f14315 (fix: drop useSearchParams to unblock static build)
=======
>>>>>>> e3974fd (fix: unblock static builds)
=======
  },
  themeColor: '#ffffff'
};
>>>>>>> 4bf40f5 (fix: enforce pnpm install on vercel)
