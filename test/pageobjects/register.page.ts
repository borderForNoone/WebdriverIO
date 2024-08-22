class RegisterPage {
    readonly companyEmail = "#email";
    readonly firstName = "#first_name";
    readonly lastName = "#last_name";
    readonly password = "#password";
    readonly submitButton = "[aria-label='signup-form'] > button[type='submit']";
    readonly privacyPolicyCheckbox = "#terms_and_conditions";

    readonly emaiErrorMessage = "#email_message";
    readonly firstNameErrorMessage = "#first_name_message";
    readonly lastNameErrorMessage = "#last_name_message";
    readonly privacyPolicyErrorMessage = "#terms_and_conditions_message";

    readonly passwordRequiredErrorMessage = "#required"; 
    readonly passwordMinLengthError = "#passwordMinLength";
    readonly passwordOneNumberError = "#passwordOneNumber";
    readonly passwordOneSymbolError = "#passwordOneSymbol";
    readonly passwordUpperCaseError = "#passwordUpperCase";
    readonly passwordLowerCaseError = "#passwordLowerCase";

    readonly togglePasswordVisibilityIcon = "span[aria-label]";

    async clickSubmitButton() {
        await $(this.submitButton).click();
    }

    public async getEmailErrorMessage() {
        return await $(this.emaiErrorMessage).getText();
    }

    public async getFirstNameErrorMessage() {
        return await $(this.firstNameErrorMessage).getText();
    }

    public async getLastNameErrorMessage() {
        return await $(this.lastNameErrorMessage).getText();
    }

    public async getErrorMessage(selector: string) {
        return await $(selector).getText();
    }

    public async getPasswordFieldType() {
        return await $(this.password).getAttribute('type');
    }

    public async clickTogglePasswordVisibilityIcon() {
        await $(this.togglePasswordVisibilityIcon).click();
    }

    public async isPrivacyPolicyChecked(): Promise<boolean> {
        return await $(this.privacyPolicyCheckbox).isSelected();
    }

    public async getPrivacyPolicyErrorMessage() {
        return await $(this.privacyPolicyErrorMessage).getText();
    }

    
}

export default new RegisterPage();