import { test, expect } from '@playwright/test';

test.describe('Cart Tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'standard_user');
      await page.fill('#password', 'secret_sauce');
      await page.click('#login-button');
      await page.waitForSelector('.inventory_item');
    });
    test('should add product to cart', async ({ page }) => {

        // Navigate to the inventory page
        await Promise.all([
            page.click('.inventory_list button'),
            page.waitForURL('**/inventory.html'),
        ]);

        // Add a product to the cart
        const productNames = await page.$$eval('.inventory_item_name', elements =>
            elements.map(element => element.textContent)
        );
        const productName = productNames[0];
        const product = await page.$(`:text("${productName}")`);
        await product?.scrollIntoViewIfNeeded();
        await product?.hover();
        await (await product?.$('.btn_primary.btn_inventory'))?.click();

        // Navigate to the cart page
        await Promise.all([
            page.click('.shopping_cart_link'),
            page.waitForURL('**/inventory.html'),
        ]);

        // Verify that the product is in the cart
        const cartItems = await page.$$eval('.cart_item_label .inventory_item_name', elements =>
            elements.map(element => element.textContent)
        );
        expect(cartItems).toContain(productName);
    });

    test('should remove product from cart', async ({ page }) => {
        // Navigate to the inventory page
        await Promise.all([
            page.click('.inventory_list button'),
            page.waitForURL('**/inventory.html'),,
        ]);

        // Add a product to the cart
        const productNames = await page.$$eval('.inventory_item_name', elements =>
            elements.map(element => element.textContent)
        );
        const productName = productNames[0];
        const product = await page.$(`:text("${productName}")`);
        await product?.scrollIntoViewIfNeeded();
        await product?.hover();
        await (await product?.$('.btn_primary.btn_inventory'))?.click();

        // Navigate to the cart page
        await Promise.all([
        page.click('.shopping_cart_link'),
        page.waitForURL('**/cart.html'),,
        ]);

        // Remove the product from the cart
        const cartItem = await page.$(`:text("${productName}")`);
        await cartItem?.hover();
        await (await cartItem?.$('.btn_secondary.cart_button'))?.click();

        // Verify that the product is no longer in the cart
        const cartItems = await page.$$eval('.cart_item', elements =>
            elements.map(element => element.textContent)
        );
        expect(cartItems).not.toContain(productName);
    });
});
