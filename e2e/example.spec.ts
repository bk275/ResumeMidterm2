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
  const metaTagsContent = await page.$$eval('head meta[name]', (metaTags) => {
    return metaTags.map((tag) => tag.getAttribute('content').toLowerCase());
  });
  for (const keyword of keywordsToCheck) {
    expect(metaTagsContent).toContain(keyword.toLowerCase());
  }
});
test('Check for <div> with class "menu-bar"', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const menuBarElement = await page.$('div.menu-bar');
  expect(menuBarElement).toBeTruthy();
});
test('Check if meta tag with name "author" has a specific value', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const expectedAuthor = 'Ben Kustanovich';
  const authorContent = await page.$eval('head meta[name="author"]', (metaTag) => metaTag.getAttribute('content'));
  expect(authorContent).toBe(expectedAuthor);
});
test('Check if <div> with class "menu-bar" has a link to "projects.html"', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const expectedLink = 'projects.html';
  const linkInMenuBar = await page.$eval('div.menu-bar a', (anchor) => anchor.getAttribute('href'));
  expect(linkInMenuBar).toBe(expectedLink);
});
test('Check if <div> with class "profile-pic" has an image', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const profilePicElement = await page.$('div.profile-pic img');
  expect(profilePicElement).toBeTruthy();
});
test('Check if <i> with class "devicon-html5-plain colored" has an <img>', async ({ page }) => {
  await page.goto(BenWebsite); 
  await page.waitForLoadState('load');
  const htmlIconElement = await page.$('i.devicon-html5-plain.colored img');
  expect(htmlIconElement).toBeTruthy();
});
/* test('Check if <footer> with class "fa fa-github" has an <img> with src', async ({ page }) => {
  await page.goto(BenWebsite);
  await page.waitForLoadState('load');
  const githubFooterElement = await page.$('footer.fa.fa-github img');
  expect(githubFooterElement).toBeTruthy();
  const imgSrc = await githubFooterElement.getAttribute('src');
  expect(imgSrc).toBeTruthy();
}); */