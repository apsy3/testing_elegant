import type { Metadata } from 'next';
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
<<<<<<< HEAD
  }
=======
  },
  themeColor: '#ffffff'
>>>>>>> origin/main
=======
  }
>>>>>>> 952310a (fix: allow filtering helper to constrain keys)
};
