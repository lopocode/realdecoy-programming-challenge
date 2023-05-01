import { test, expect } from '@playwright/test';

test.describe('Logout Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Login
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.waitForSelector('.inventory_item');
    });
    test('should log out successfully', async ({ page }) => {
  
         // Logout
            await Promise.all([
            page.waitForURL('**/inventory.html'),
            page.click('#menu_button_container button')
            ]);
            await Promise.all([
            page.waitForLoadState(),
            page.click('#logout_sidebar_link')
        ]);
  
        // Verify logout
        const loginButton = await page.$('[data-test="login-button"]');
        expect(loginButton).toBeTruthy();
    });
  
    test('should not be able to access inventory page after logout', async ({ page }) => {
  
     // Logout
        await Promise.all([
            page.waitForURL('**/inventory.html'),
            page.click('#menu_button_container button')
        ]);
        await Promise.all([
            page.waitForLoadState(),
            page.click('#logout_sidebar_link')
        ]);
  
        // Attempt to access inventory page
        await page.goto('https://www.saucedemo.com/inventory.html');
        const loginButton = await page.$('[data-test="login-button"]');
        expect(loginButton).toBeTruthy();
    });
}); 