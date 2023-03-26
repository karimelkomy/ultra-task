import { sprintf } from "sprintf-js";
import GenericElement from "../components/GenericElement";

export default class ProductsPage extends GenericElement {
  constructor() {
    super();
    this.productItem = '//div[@class="inventory_item"][.//div[text()="%s"]]';
    this.productNameButton = `${this.productItem}//div[@class="inventory_item_name"]`;
    this.addToCartButton = `${this.productItem}//button[contains(@data-test, "add-to-cart")]`;
    this.removeButton = `${this.productItem}//button[contains(@data-test, "remove")]`;
  }

  async openProductDetails({ productDetails }) {
    const { name } = productDetails;

    await this.click(sprintf(this.productNameButton, name));
  }

  async addProductsToCart({ productsDetails }) {
    for (const productDetails of productsDetails) {
      const { name } = productDetails;

      await this.click(sprintf(this.addToCartButton, name));
    }
  }

  async removeProducts({ productsDetails }) {
    for (const productDetails of productsDetails) {
      const { name } = productDetails;

      await this.click(sprintf(this.removeButton, name));
    }
  }
}
