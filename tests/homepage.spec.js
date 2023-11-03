const { test, expect } = require('@playwright/test');

/* test('check that "express works" text is present', async ({ page }) => {
  await page.goto('/');
  
  // Using the expect method with a page locator
  // This will check if the text "express works" is present anywhere on the page
  // Using a locator to get the text content of the h1 element
  const heading = page.locator('h1');
  await expect(heading).toHaveText('express works');

}); */

test('check that UTF-8 meta tag is present', async ({ page }) => {
  //Arrange: Go to the site homepage
  await page.goto('/');

  //Act: Get the content attribute of the meta charset tag
  const metaCharset = await page.$eval('meta[charset]', (meta) => meta.getAttribute('charset'));

  //Assert: Check if the charset is set to UTF-8
  await expect(metaCharset).toBe('utf-8');
});
