import { sprintf } from "sprintf-js";
import GenericElement from "../components/GenericElement";

export default class CheckoutOverviewPage extends GenericElement {
  constructor() {
    super();
    this.cartItem = '//div[@class="cart_item"][.//div[text()="%s"]]';
    this.cartItems = '//div[@class="cart_item"]';
    this.productNameText = `${this.cartItem}//div[@class="inventory_item_name"]`;
    this.productPriceText = `${this.cartItem}//div[@class="inventory_item_price" and text()="%s"]`;
    this.productQtyText = `${this.cartItem}//div[@class="cart_quantity" and text()="%s"]`;
    this.finishButton = '//button[@data-test="finish"]';
  }

  async validateProductOverview({ productsDetails }) {
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

  async clickFinishButton() {
    await this.click(this.finishButton);
  }

  async submit({ productsDetails }) {
    await this.validateProductOverview({ productsDetails });
    await this.clickFinishButton();
  }
}
