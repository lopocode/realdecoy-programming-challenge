import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('should log in with valid credentials', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const url = await page.url();
    expect(url).toContain('/inventory.html');
  });

  test('should not log in with invalid credentials', async ({ page }) => {
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'invalid_password');
    await page.click('#login-button');
    const url = await page.url();
    expect(url).toContain('/');
    const errorMessage = await page.textContent('.error-message-container.error');
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });
  
  //Create a test that logs in with a locked out user and verifies the error message
    test('should not log in with locked out user', async ({ page }) => {
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const url = await page.url();
    expect(url).toContain('/');
    const errorMessage = await page.textContent('.error-message-container.error');
    expect(errorMessage).toContain('this user has been locked out.');
    })

    //Create a test that logs in with a problem user and verifies expected behavior
    test('should not log in with problem user with invalid password', async ({ page }) => {
    await page.fill('#user-name', 'problem_user');
    await page.fill('#password', 'invalid_password');
    await page.click('#login-button');
    const url = await page.url();
    expect(url).toContain('/');
    const errorMessage = await page.textContent('.error-message-container.error');
    expect(errorMessage).toContain('Username and password do not match any user in this service');
    })

    test('should log in with problem user with valid password', async ({ page }) => {
        await page.fill('#user-name', 'problem_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        const url = await page.url();
        expect(url).toContain('/inventory.html');
    })

    //Create a test that logs in with a performance glitch user and verifies expected behavior
    test('should log in with performance glitch user', async ({ page }) => {
        await page.fill('#user-name', 'problem_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        const url = await page.url();
        expect(url).toContain('/inventory.html');
    })
});
