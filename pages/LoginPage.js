import GenericElement from "../components/GenericElement";

export default class LoginPage extends GenericElement {
  constructor() {
    super();
    this.userNameInput = '//input[@data-test="username"]';
    this.passwordInput = '//input[@data-test="password"]';
    this.loginButton = '//input[@data-test="login-button"]';
  }

  async login({ userDetails }) {
    const { userName, password } = userDetails;

    await this.fill(this.userNameInput, userName);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
