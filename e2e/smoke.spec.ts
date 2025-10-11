import { test, expect } from '@playwright/test';

const MOCK_CHECKOUT = '/cart?mode=mock';

test.describe('Storefront smoke test', () => {
  test('navigate from home to product and checkout', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Featured Heirlooms')).toBeVisible();

    await page.getByRole('link', { name: 'Women' }).first().click();
    await expect(page).toHaveURL(/\/women/);

    const firstProduct = page.getByRole('link').filter({ hasText: '₹' }).first();
    await firstProduct.click();
    await expect(page).toHaveURL(/\/product\//);

    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.getByRole('button', { name: /cart/ }).click();
    await expect(page.getByRole('dialog', { name: /shopping cart/i })).toBeVisible();

    await page.getByRole('button', { name: /proceed to checkout/i }).click();

    await page.waitForTimeout(500);
    await expect(page).toHaveURL(new RegExp('checkout|mock', 'i'));
  });
});
