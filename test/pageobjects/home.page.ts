    class HomePage {
        readonly title = '[data-test="title"]';
        readonly productList = '.inventory_item';
        readonly cartBadge = '.shopping_cart_badge';
        readonly sortDropdown = '[data-test="product-sort-container"]';
        readonly productName = '.inventory_item_name';
        readonly productPrice = '.inventory_item_price';
        readonly menuButton = '#react-burger-menu-btn';
        readonly logoutButton = '#logout_sidebar_link';

        async addProductToCart(productName: string) {
            const productElement = $(`//*[text()='${productName}']/ancestor::div[@class="inventory_item"]//button`);
            await productElement.click();
        }

        async removeProductFromCart(productName: string) {
            const removeButton = $(`//*[text()='${productName}']/ancestor::div[@class="inventory_item"]//button`);
            await removeButton.click();
        }

        async getCartCount() {
            const cartBadgeElement = $(this.cartBadge);
            return await cartBadgeElement.getText();
        }

        async sortProductsBy(option: string) {
            const dropdown = $(this.sortDropdown);
            await dropdown.selectByVisibleText(option);
        }

        async getFirstProduct() {
            const products = $$(this.productList);
            const firstProduct = products[0]; 
            return {
                name: await firstProduct.$(this.productName).getText(),
                price: await firstProduct.$(this.productPrice).getText()
            };
        }

        async openMenu() {
            const menuBtn = $(this.menuButton);
            await menuBtn.click();
        }

        async clickLogoutButton() {
            const logoutBtn = $(this.logoutButton);
            await logoutBtn.click();
        }
    }

    export default new HomePage();