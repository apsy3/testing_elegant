export const SITE_CONFIG = {
  name: 'Heritage Atelier',
  description:
    'An elevated curation of handcrafted Indian luxury, blending timeless artistry with modern silhouettes.',
  locale: 'en-IN',
  currency: 'INR',
  contactEmail: 'hello@heritageatelier.example'
};

export const MOCK_CHECKOUT_URL = '/cart?mode=mock';

const DEFAULT_HERO_IMAGE =
  'https://images-cdn.openai.com/luxury-heritage/model-handcrafted-attire.jpg';

export const HERO_IMAGE_URL =
  process.env.NEXT_PUBLIC_HERO_IMAGE_URL?.trim() || DEFAULT_HERO_IMAGE;
