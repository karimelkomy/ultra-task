import { sprintf } from "sprintf-js";
import GenericElement from "../components/GenericElement";

export default class CartPage extends GenericElement {
  constructor() {
    super();
    this.cartItem = '//div[@class="cart_item"][.//div[text()="%s"]]';
    this.cartItems = '//div[@class="cart_item"]';
    this.productNameText = `${this.cartItem}//div[@class="inventory_item_name"]`;
    this.productPriceText = `${this.cartItem}//div[@class="inventory_item_price" and text()="%s"]`;
    this.productQtyText = `${this.cartItem}//div[@class="cart_quantity" and text()="%s"]`;
    this.removeButton = `${this.cartItem}//button[contains(@data-test, "remove")]`;
    this.checkoutButton = '//button[@data-test="checkout"]';
    this.continueShoppingButton = '//button[@data-test="continue-shopping"]';
  }

  async validateProductInCart({ productsDetails }) {
    for (const productDetails of productsDetails) {
      const { name, price, qty } = productDetails;

      await this.validateElementVisibility(sprintf(this.productNameText, name));
      await this.validateElementVisibility(
        sprintf(this.productPriceText, name, price)
      );
      await this.validateElementVisibility(
        sprintf(this.productQtyText, name, qty)
      );
    }

    const cartItemCount = await this.getCount(this.cartItems);

    await this.validateEqual(cartItemCount, productsDetails.length);
  }

  async removeProductsFromCart({ productsDetails }) {
    for (const productDetails of productsDetails) {
      const { name } = productDetails;

      await this.click(sprintf(this.removeButton, name));
    }
  }

  async clickCheckoutButton() {
    await this.click(this.checkoutButton);
  }

  async clickContinueShoppingButton() {
    await this.click(this.continueShoppingButton);
  }

  async submit({ productsDetails }) {
    await this.validateProductInCart({ productsDetails });
    await this.clickCheckoutButton();
  }
}
