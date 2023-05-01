import { test, expect } from '@playwright/test';

test.describe('Inventory Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForSelector('.inventory_item');
  });

  test('should display all items', async ({ page }) => {
    const products = await page.$$('.inventory_item');
    expect(products.length).toBeGreaterThan(0);
  });

  test('should sort products by name (A to Z)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'az');
    await page.waitForSelector('.inventory_item_name');
    const productNames = await page.$$eval('.inventory_item_name', elements => elements.map(el => el.textContent));
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('should add product to cart', async ({ page }) => {
    const inventoryItems = await page.$$('.inventory_item');
    expect(inventoryItems.length).toBeGreaterThan(5);
    const sauceLabsBackpackAdd = await page.waitForSelector('#add-to-cart-sauce-labs-backpack');
    sauceLabsBackpackAdd.click();
    await page.waitForSelector('.shopping_cart_badge');
    const cartCount = await page.textContent('.shopping_cart_badge');
    expect(cartCount).toBe('1');
  
  });  
});




