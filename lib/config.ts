const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80';

export const HERO_IMAGE_URL = process.env.NEXT_PUBLIC_HERO_IMAGE_URL ?? DEFAULT_HERO_IMAGE;

export const SITE_CONFIG = {
  name: 'Heritage Atelier',
  description:
    'An elevated curation of handcrafted Indian luxury, blending timeless artistry with modern silhouettes.',
  locale: 'en-IN',
  currency: 'INR',
  contactEmail: 'hello@heritageatelier.example'
};

export const MOCK_CHECKOUT_URL = '/cart?mode=mock';
