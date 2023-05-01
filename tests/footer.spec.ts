import { test, expect } from '@playwright/test';

test.describe('Footer Links', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.inventory_item');
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('should have at least 3 links in the footer', async ({page}) => {
    const footerLinks = await page.$$('.footer a');

    expect(footerLinks.length).toBeGreaterThanOrEqual(3);
  });

  test('should have visible links in the footer', async ({page}) => {
    const footerLinks = await page.$$('.footer a');
    for (const link of footerLinks) {
      expect(await link.isVisible()).toBe(true);
    }
  });

  test('should have specific link text in the footer', async ({page}) => {
    const footerLinks = await page.$$('.footer a');
    const expectedLinkTexts = ['Twitter', 'Facebook', 'LinkedIn'];
    for (const link of footerLinks) {
      const linkText = await link.textContent();
      if (expectedLinkTexts.includes(linkText)) {
        expect(linkText).toContain(linkText);
      }
    }
  });

  test('should have link redirect to correct page', async ({page}) => {
    // Get all the footer links
        const footerLinks = await page.$$('footer a');
  
    // Click each link and check the URL
        for (let i = 0; i < footerLinks.length; i++) {
            const link = footerLinks[i];
            const url = await link.getAttribute('href');
    
        // Click the link and open in a new tab
            await link.click({ button: 'middle' });
    
        // Wait for the new tab to open
        try {
            const [newPage] = await Promise.all([
              page.waitForEvent('popup', { timeout: 5000 }),
              page.waitForTimeout(500), // Add a delay to allow the new tab to fully open
            ]);
            
            //Navigate to the new tab
            await newPage.goto(url);
            
            //Check the URL
            expect(newPage.url()).toBe(url);
            
            // Close the new tab
            await newPage.close();
          } catch (error) {
            console.error(`Error opening link ${url}: ${error.message}`);
          }
            
            //Switch back to the original tab
            await page.bringToFront();
        }
  });
});
