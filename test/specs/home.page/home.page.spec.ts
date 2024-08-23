import { expect } from '@wdio/globals';
import loginPage from '../../pageobjects/login.page.js';
import homePage from '../../pageobjects/home.page.js';

const validUsername = 'standard_user';
const validPassword = 'secret_sauce';

describe('Home Page', () => {
    beforeEach(async () => {
        await browser.url('');
    
        await $(loginPage.userNameInput).setValue(validUsername);
        await $(loginPage.passwordInput).setValue(validPassword);
        await loginPage.clickLogInButton();
    });    

    xit('should display a list of products after login', async () => {
        const products = await $$(homePage.productList);
        expect(products.length).toBeGreaterThan(0);
    });

    xit('should add a product to the cart and verify the cart count', async () => {
        const initialProduct = await homePage.getFirstProduct();
        const initialProductName = initialProduct.name;

        await homePage.addProductToCart(initialProductName);
        const cartCount = await homePage.getCartCount();

        expect(cartCount).toEqual('1'); 

        await homePage.removeProductFromCart(initialProductName);
    });

    xit('should be able to remove a product from the cart', async () => {
        const initialProduct = await homePage.getFirstProduct();
        const initialProductName = initialProduct.name;
        
        await homePage.addProductToCart(initialProductName);
        await homePage.removeProductFromCart(initialProductName);
        
        const isCartBadgePresent = await $(homePage.cartBadge).isExisting();
        expect(isCartBadgePresent).toBe(false);
    });

    xit('should sort products by price from low to high', async () => {
        const initialProduct = await homePage.getFirstProduct();
        const initialPrice = initialProduct.price;
    
        await homePage.sortProductsBy('Price (low to high)');
    
        const sortedProduct = await homePage.getFirstProduct();
        const sortedPrice = sortedProduct.price;
    
        expect(Number.parseFloat(sortedPrice.replace('$', ''))).toBeLessThanOrEqual(Number.parseFloat(initialPrice.replace('$', '')));
    });  

    xit('should sort products by price from low to high', async () => {
        const initialProduct = await homePage.getFirstProduct();
        const initialPrice = initialProduct.price;

        await homePage.sortProductsBy('Price (low to high)');

        const sortedProduct = await homePage.getFirstProduct();
        const sortedPrice = sortedProduct.price;

        expect(Number.parseFloat(sortedPrice.replace('$', ''))).toBeLessThanOrEqual(Number.parseFloat(initialPrice.replace('$', '')));
    });
    
    xit('should sort products by name from A to Z', async () => {
        await homePage.sortProductsBy('Name (A to Z)');

        const firstProduct = await homePage.getFirstProduct();
        const sortedProduct = await homePage.getFirstProduct();

        expect(firstProduct.name.localeCompare(sortedProduct.name)).toBeLessThanOrEqual(0);
    });

    xit('should sort products by name from Z to A', async () => {
        await homePage.sortProductsBy('Name (Z to A)');

        const firstProduct = await homePage.getFirstProduct();
        const sortedProduct = await homePage.getFirstProduct();

        expect(firstProduct.name.localeCompare(sortedProduct.name)).toBeGreaterThanOrEqual(0);
    });

    it('should have an empty cart after logging out and back in', async () => {
        const product = await homePage.getFirstProduct();
        await homePage.addProductToCart(product.name);

        await homePage.openMenu();
        await homePage.clickLogoutButton();

        await $(loginPage.userNameInput).setValue(validUsername);
        await $(loginPage.passwordInput).setValue(validPassword);
        await loginPage.clickLogInButton();

        const cartCount = await homePage.getCartCount();

        expect(cartCount).toEqual('');
    });
    

});