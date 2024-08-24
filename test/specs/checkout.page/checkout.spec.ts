import { expect } from '@wdio/globals';
import loginPage from '../../pageobjects/login.page.js';
import homePage from '../../pageobjects/home.page.js';
import cartPage from '../../pageobjects/cart.page.js';
import checkoutPage from '../../pageobjects/сheckout.page.js';
import { faker } from '@faker-js/faker';

const validUsername = 'standard_user';
const validPassword = 'secret_sauce';

describe('Home Page', () => {
    beforeEach(async () => {
        await browser.url('');

        await $(loginPage.userNameInput).setValue(validUsername);
        await $(loginPage.passwordInput).setValue(validPassword);
        await loginPage.clickLogInButton();

        $(homePage.cartButton).click();
        $(cartPage.checkoutButton).click();
    });

    it('should display an error message with empty fields', async () => {
        await $(checkoutPage.continueButton).click();
    
        await browser.waitUntil(async () => {
            const errorContainer = $(checkoutPage.errorContainer);
            return errorContainer.isDisplayed();
        }, {
            timeout: 6000,
            timeoutMsg: 'Expected error message container to be displayed after clicking continue with empty fields'
        });
    
        const errorMessage = await $(checkoutPage.errorContainer).getText();
        expect(errorMessage).toContain('Error: First Name is required');
    });

    it('should display an error message without entering a Last Name', async () => {
        await $(checkoutPage.firstNameInput).setValue(faker.person.firstName());

        await $(checkoutPage.continueButton).click();

        const errorMessage = await $(checkoutPage.errorContainer).getText();
        expect(errorMessage).toContain('Error: Last Name is required');
    });

    it('should display an error message without entering a Last Name', async () => {
        await $(checkoutPage.firstNameInput).setValue(faker.person.firstName());
        await $(checkoutPage.lastNameInput).setValue(faker.person.lastName());

        await $(checkoutPage.continueButton).click();

        const errorMessage = await $(checkoutPage.errorContainer).getText();
        expect(errorMessage).toContain('Error: Postal Code is required');
    });
});