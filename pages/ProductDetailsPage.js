import GenericElement from "../components/GenericElement";

export default class ProductDetailsPage extends GenericElement {
  constructor() {
    super();
    this.addToCartButton = '//button[contains(@data-test, "add-to-cart")]';
  }

  async addProductToCart() {
    await this.click(this.addToCartButton);
  }
}
