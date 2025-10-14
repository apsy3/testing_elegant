import { describe, it, expect, vi } from 'vitest';
import { mockProducts } from '../mock-data';

vi.mock('react', () => ({
  cache: <T extends (...args: any[]) => any>(fn: T) => fn
}));

describe('preview data layer', () => {
  it('returns mock products from listProducts', async () => {
    const { listProducts } = await import('../shopify');
    const products = await listProducts();
    expect(products).toHaveLength(mockProducts.length);
  });

  it('provides a mock checkout url', async () => {
    const { createCheckout } = await import('../shopify');
    const checkout = await createCheckout([{ merchandiseId: 'gid://mock/1', quantity: 1 }]);
    expect(checkout.checkoutUrl).toContain('/cart');
  });

  it('throws when attempting to use remote fetch', async () => {
    const { shopifyFetch } = await import('../shopify');
    await expect(shopifyFetch()).rejects.toThrow('Remote Shopify access is disabled');
  });
});
