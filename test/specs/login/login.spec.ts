import { expect } from '@wdio/globals';
import { faker } from '@faker-js/faker';
import loginPage from '../../pageobjects/login.page.js';
import homePage from '../../pageobjects/home.page.js';

describe('Login Page', () => {
    xit('should show error message with empty fields', async () => {
        await loginPage.clickLogInButton();

        const errorMessage = await loginPage.getErrorMesssageContainer();
        expect(errorMessage).toEqual('Epic sadface: Username is required');
    });

    xit('should display an error message without entering a username', async () => {
        await $(loginPage.passwordInput).setValue(faker.internet.password());

        await loginPage.clickLogInButton();

        const errorMessage = await loginPage.getErrorMesssageContainer();
        expect(errorMessage).toEqual('Epic sadface: Username is required');
    });

    xit('should display an error message without entering a password', async () => {
        await $(loginPage.userNameInput).setValue(faker.internet.userName());

        await loginPage.clickLogInButton();

        const errorMessage = await loginPage.getErrorMesssageContainer();
        expect(errorMessage).toEqual('Epic sadface: Password is required');
    });

    xit('should display an error message with invalid username and password', async () => {
        const invalidUsername = faker.internet.userName();
        const invalidPassword = faker.internet.password();

        await $(loginPage.userNameInput).setValue(invalidUsername);
        await $(loginPage.passwordInput).setValue(invalidPassword);

        await loginPage.clickLogInButton();

        const errorMessage = await loginPage.getErrorMesssageContainer();
        expect(errorMessage).toEqual('Epic sadface: Username and password do not match any user in this service');
    });

    xit('should successfully log in with valid credentials', async () => {
        const validUsername = 'standard_user';
        const validPassword = 'secret_sauce';

        await $(loginPage.userNameInput).setValue(validUsername);
        await $(loginPage.passwordInput).setValue(validPassword);

        await loginPage.clickLogInButton();

        await expect($(homePage.title)).toBeDisplayed();

        const titleText = await $(homePage.title).getText();
        expect(titleText).toEqual('Products')
    });
});
