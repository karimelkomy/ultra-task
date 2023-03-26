import GenericElement from "../components/GenericElement";

export default class CheckoutCompletePage extends GenericElement {
  constructor() {
    super();
    this.orderCompletedText = '//h2[@class="complete-header"]';
  }

  async validateOrderCompleted() {
    await this.validateElementVisibility(this.orderCompletedText);
  }
}
