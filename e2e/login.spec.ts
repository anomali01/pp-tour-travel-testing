import { test, expect } from '@playwright/test';

test.describe('Login Page — System Tests (Black-Box)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
  });

  /**
   * TC-SYS-04: Login page loads correctly
   */
  test('TC-SYS-04: login page loads with form fields visible', async ({ page }) => {
    await expect(page.getByText('Selamat Datang Kembali')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-04-login-page-load.png',
    });
  });

  /**
   * TC-SYS-05: Submitting empty form shows email validation error
   */
  test('TC-SYS-05: submitting empty login form shows email error', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    const emailError = page.getByText('Email wajib diisi');
    await expect(emailError).toBeVisible();

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-05-login-empty-form-error.png',
    });
  });

  /**
   * TC-SYS-06: Invalid email format shows format error
   */
  test('TC-SYS-06: invalid email format shows format validation error', async ({ page }) => {
    await page.locator('input[type="email"]').fill('invalidemail@domain');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button[type="submit"]').click();

    const emailFormatError = page.getByText('Format email tidak valid');
    await expect(emailFormatError).toBeVisible();

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-06-login-invalid-email.png',
    });
  });

  /**
   * TC-SYS-07: Short password shows password validation error
   */
  test('TC-SYS-07: password shorter than 6 chars shows password error', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@example.com');
    await page.locator('input[type="password"]').fill('123');
    await page.locator('button[type="submit"]').click();

    const passwordError = page.getByText('Password minimal 6 karakter');
    await expect(passwordError).toBeVisible();

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-07-login-short-password.png',
    });
  });

  /**
   * TC-SYS-08: Valid credentials triggers login flow (redirects to paket-tour)
   */
  test('TC-SYS-08: valid credentials redirect to paket-tour page', async ({ page }) => {
    await page.locator('input[type="email"]').fill('user@example.com');
    await page.locator('input[type="password"]').fill('password123');

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-08a-login-filled.png',
    });

    await page.locator('button[type="submit"]').click();

    // Wait for loading state — button shows "Loading..."
    await expect(page.getByText('Loading...')).toBeVisible();

    // Wait for redirect
    await page.waitForURL('**/paket-tour', { timeout: 10000 });
    await expect(page).toHaveURL(/.*paket-tour/);

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-08b-login-success.png',
      fullPage: true,
    });
  });

  /**
   * TC-SYS-09: Forgot password link navigates correctly
   */
  test('TC-SYS-09: forgot password link navigates to forgot-password page', async ({ page }) => {
    await page.getByText('Lupa password?').click();
    await expect(page).toHaveURL(/.*forgot-password/);

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-09-forgot-password.png',
    });
  });

  /**
   * TC-SYS-10: Register link is visible and navigates to register page
   */
  test('TC-SYS-10: register link navigates to register page', async ({ page }) => {
    await page.getByText('Daftar sekarang').click();
    await expect(page).toHaveURL(/.*register/);

    await page.screenshot({
      path: 'documentation/screenshots/TC-SYS-10-register-nav.png',
    });
  });
});
