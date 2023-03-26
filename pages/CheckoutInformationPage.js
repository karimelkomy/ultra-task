import GenericElement from "../components/GenericElement";

export default class CheckoutInformationPage extends GenericElement {
  constructor() {
    super();
    this.firstNameInput = '//input[@data-test="firstName"]';
    this.lastNameInput = '//input[@data-test="lastName"]';
    this.postalCodeInput = '//input[@data-test="postalCode"]';
    this.continueButton = '//input[@data-test="continue"]';
  }

  async submit({ userDetails }) {
    const { firstName, lastName, postalCode } = userDetails;

    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);

    await this.click(this.continueButton);
  }
}
