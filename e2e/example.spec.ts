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
test('check if resume title is visible', async ({ page }) => {
  await page.goto(BenWebsite);
  const resumeButton = await page.$('.resume-button');
  expect(resumeButton).toBeTruthy();
});
test('Check if HTML is connected to styles.css', async ({ page }) => {
  await page.goto(BenWebsite);
  const isStylesheetLinked = await page.evaluate(() => {
    const stylesheets = Array.from(document.styleSheets);
    return stylesheets.some(sheet => sheet.href && sheet.href.includes('styles.css'));
  });
  expect(isStylesheetLinked).toBeTruthy();
});
test('Check if a <body> tag is present', async ({ page }) => {
  await page.goto(BenWebsite);
  const bodyTag = await page.$('body');
  expect(bodyTag).toBeTruthy();
});
test('Check for exactly one <header> tag', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const headerElements = await page.$$('header');
  expect(headerElements.length).toBe(1);
  const headerTag = headerElements[0];
  expect(headerTag).toBeTruthy();
});
test('Check for exactly one <footer> tag', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const footerElements = await page.$$('footer');
  expect(footerElements.length).toBe(1);
  const footerTag = footerElements[0];
  expect(footerTag).toBeTruthy();
});
test('Check for keywords in HTML file', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const keywordsToCheck = ['student', 'resume', 'project'];
  const pageContent = await page.textContent('html');
  for (const keyword of keywordsToCheck) {
    expect(pageContent.toLowerCase()).toContain(keyword.toLowerCase());
  }
});
test('Check for <div> with class "menu-bar"', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const menuBarElement = await page.$('div.menu-bar');
  expect(menuBarElement).toBeTruthy();
});