const { test, expect } = require('@playwright/test');
const BenWebsite = 'https://bk275.github.io/ResumeMidterm2/';

test.beforeEach(async ({ page }) => {
  await page.goto(BenWebsite);
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
test('Check website language is English', async ({ page }) => {
  await page.goto(BenWebsite);
  const language = await page.$eval('html', (html) => html.lang);
  expect(language).toBe('en');
});
