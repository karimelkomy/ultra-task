import GenericElement from "./GenericElement";

export default class Header extends GenericElement {
  constructor() {
    super();
    this.cartButton =
      '//div[@class="primary_header"]//div[@id="shopping_cart_container"]';
  }

  async openCart() {
    await this.click(this.cartButton);
  }
}
