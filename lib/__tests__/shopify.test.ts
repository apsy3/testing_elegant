import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

<<<<<<< HEAD
vi.mock('react', () => ({
  cache: <T>(fn: T) => fn
}));
=======
declare global {
  // eslint-disable-next-line no-var
  var fetch: typeof fetch;
}
>>>>>>> ea3c549 (refactor: simplify catalog definitions)

describe('shopifyFetch', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.SHOPIFY_STORE_DOMAIN;
    delete process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws when credentials are missing', async () => {
    const { shopifyFetch } = await import('../shopify');

    await expect(shopifyFetch('{ shop { name } }')).rejects.toThrow('Shopify credentials');
  });

  it('invokes Shopify endpoint when credentials exist', async () => {
    process.env.SHOPIFY_STORE_DOMAIN = 'demo.myshopify.com';
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'token';

    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({ data: { shop: { name: 'Demo' } } })
    } as Response);

    const { shopifyFetch } = await import('../shopify');

    const result = await shopifyFetch<{ shop: { name: string } }>('query', { foo: 'bar' });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://demo.myshopify.com/api/2025-01/graphql.json',
      expect.objectContaining({
        method: 'POST'
      })
    );
    expect(result.shop.name).toBe('Demo');
  });
});
