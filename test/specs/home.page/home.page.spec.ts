import { expect } from '@wdio/globals';
import loginPage from '../../pageobjects/login.page.js';
import homePage from '../../pageobjects/home.page.js';

const validUsername = 'standard_user';
const validPassword = 'secret_sauce';

const socialLinks = {
    twitter: 'https://x.com/saucelabs',
    facebook: 'https://www.facebook.com/saucelabs',
    linkedin: 'https://www.linkedin.com/company/sauce-labs/'
};

describe('Home Page', () => {
    beforeEach(async () => {
        await browser.url('');

        await $(loginPage.userNameInput).setValue(validUsername);
        await $(loginPage.passwordInput).setValue(validPassword);
        await loginPage.clickLogInButton();
    });

    it('should display a list of products after login', async () => {
        const products = await $$(homePage.productList);
        expect(products.length).toBeGreaterThan(0);
    });

    it('should add a product to the cart and verify the cart count', async () => {
        const initialProduct = await homePage.getFirstProduct();
        const initialProductName = initialProduct.name;

        await homePage.addProductToCart(initialProductName);
        const cartCount = await homePage.getCartCount();

        expect(cartCount).toEqual('1');

        await homePage.removeProductFromCart(initialProductName);
    });

    it('should be able to remove a product from the cart', async () => {
        const initialProduct = await homePage.getFirstProduct();
        const initialProductName = initialProduct.name;

        await homePage.addProductToCart(initialProductName);
        await homePage.removeProductFromCart(initialProductName);

        const isCartBadgePresent = await $(homePage.cartBadge).isExisting();
        expect(isCartBadgePresent).toBe(false);
    });

    it('should sort products by price from low to high', async () => {
        const initialProduct = await homePage.getFirstProduct();
        const initialPrice = initialProduct.price;

        await homePage.sortProductsBy('Price (low to high)');

        const sortedProduct = await homePage.getFirstProduct();
        const sortedPrice = sortedProduct.price;

        expect(Number.parseFloat(sortedPrice.replace('$', ''))).toBeLessThanOrEqual(Number.parseFloat(initialPrice.replace('$', '')));
    });

    it('should sort products by price from high to low', async () => {
        const initialProduct = await homePage.getFirstProduct();
        const initialPrice = initialProduct.price;
    
        await homePage.sortProductsBy('Price (high to low)');
    
        const sortedProduct = await homePage.getFirstProduct();
        const sortedPrice = sortedProduct.price;
    
        expect(Number.parseFloat(sortedPrice.replace('$', ''))).toBeGreaterThanOrEqual(Number.parseFloat(initialPrice.replace('$', '')));
    });    

    it('should sort products by name from A to Z', async () => {
        await homePage.sortProductsBy('Name (A to Z)');

        const firstProduct = await homePage.getFirstProduct();
        const sortedProduct = await homePage.getFirstProduct();

        expect(firstProduct.name.localeCompare(sortedProduct.name)).toBeLessThanOrEqual(0);
    });

    it('should sort products by name from Z to A', async () => {
        await homePage.sortProductsBy('Name (Z to A)');

        const firstProduct = await homePage.getFirstProduct();
        const sortedProduct = await homePage.getFirstProduct();

        expect(firstProduct.name.localeCompare(sortedProduct.name)).toBeGreaterThanOrEqual(0);
    });

    it('should not have an empty cart after logging out and back in', async () => {
        const product = await homePage.getFirstProduct();
        await homePage.addProductToCart(product.name);

        await homePage.openMenu();
        await homePage.clickLogoutButton();

        await $(loginPage.userNameInput).setValue(validUsername);
        await $(loginPage.passwordInput).setValue(validPassword);
        await loginPage.clickLogInButton();

        const cartCount = await homePage.getCartCount();

        expect(cartCount).toEqual('1');
        
        await homePage.removeProductFromCart(product.name);
    });

    it('should add multiple products to the cart and verify cart count', async () => {
        const products = $$(homePage.productList);

        for (let i = 0; i < 2; i++) {
            const productName = await products[i].$(homePage.productName).getText();
            await homePage.addProductToCart(productName);
        }

        const cartCount = await homePage.getCartCount();
        expect(cartCount).toEqual('2');

        for (let i = 0; i < 2; i++) {
            const productName = await products[i].$(homePage.productName).getText();
            await homePage.removeProductFromCart(productName);
        }
    });

    it('should open the Twitter page and verify URL', async () => {
        await $(homePage.twitterLink).click();

        const handles = await browser.getWindowHandles();
        await browser.waitUntil(async () => handles.length > 1, {
            timeout: 5000,
            timeoutMsg: 'Expected a new tab to open'
        });

        await browser.switchToWindow(handles[1]);

        await browser.waitUntil(async () => (await browser.getUrl()).includes(socialLinks.twitter), {
            timeout: 10000,
            timeoutMsg: 'Expected URL to contain x.com/saucelabs'
        });

        expect(await browser.getUrl()).toContain(socialLinks.twitter);

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('should open the Facebook page and verify URL', async () => {
        await $(homePage.facebookLink).click();
    
        const handles = await browser.getWindowHandles();
        await browser.waitUntil(async () => handles.length > 1, {
            timeout: 5000,
            timeoutMsg: 'Expected a new tab to open'
        });
    
        await browser.switchToWindow(handles[1]);
    
        await browser.waitUntil(async () => (await browser.getUrl()).includes(socialLinks.facebook), {
            timeout: 10000,
            timeoutMsg: 'Expected URL to contain facebook.com/saucelabs'
        });
    
        expect(await browser.getUrl()).toContain(socialLinks.facebook); 
    
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });  
});