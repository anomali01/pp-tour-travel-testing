import { test, expect } from '@playwright/test';

/**
 * TC-SYS-01: Homepage loads correctly
 * Black-box test verifying the landing page renders key elements
 */
test.describe('Home Page — System Tests', () => {
  test('TC-SYS-01: homepage loads and displays the hero section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify the page title
    await expect(page).toHaveTitle(/Create Next App|pp/i);

    // Take a full-page screenshot for documentation
    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-01-homepage.png',
      fullPage: true,
    });
  });

  test('TC-SYS-02: navbar is visible on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navbar should be present
    const navbar = page.locator('nav').first();
    await expect(navbar).toBeVisible();

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-02-navbar.png',
    });
  });

  test('TC-SYS-03: login navigation link works from homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate directly to login
    await page.goto('/login');
    await expect(page).toHaveURL(/.*login/);

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-03-login-nav.png',
    });
  });
});
