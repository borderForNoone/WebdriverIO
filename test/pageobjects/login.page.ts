class LoginPage {
    readonly userNameInput = "#user-name";
    readonly passwordInput = "#password";
    readonly loginButton = "#login-button";
    readonly errorMesssageContainer = ".error-message-container";

    async clickLogInButton() {
        await $(this.loginButton).click();
    }

    public async getErrorMesssageContainer() {
        return await $(this.errorMesssageContainer).getText();
    }
}

export default new LoginPage();