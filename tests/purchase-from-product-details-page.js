import { urls } from "../data/urls";
import { userDetails } from "../data/userDetails";
import { productDetails } from "../data/productDetails";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import Header from "../components/Header";
import CartPage from "../pages/CartPage";
import CheckoutInformationPage from "../pages/CheckoutInformationPage";
import CheckoutOverviewPage from "../pages/CheckoutOverviewPage";
import CheckoutCompletePage from "../pages/CheckoutCompletePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";

fixture`Purchase From product details page`
  .page(urls.home)
  .beforeEach(async (t) => {
    await t.maximizeWindow();
    await t.setNativeDialogHandler(() => true);
  });

test("Validate purchase flow from product details page - successfully", async (t) => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const productDetailsPage = new ProductDetailsPage();
  const header = new Header();
  const cartPage = new CartPage();
  const checkoutInformationPage = new CheckoutInformationPage();
  const checkoutOverviewPage = new CheckoutOverviewPage();
  const checkoutCompletePage = new CheckoutCompletePage();

  await loginPage.login({ userDetails });

  await productsPage.openProductDetails({ productDetails });

  await productDetailsPage.addProductToCart();

  await header.openCart();

  await cartPage.submit({ productsDetails: [productDetails] });

  await checkoutInformationPage.submit({ userDetails });

  await checkoutOverviewPage.submit({ productsDetails: [productDetails] });

  await checkoutCompletePage.validateOrderCompleted();
}).meta({
  customTest: "validate-purchase-from-product-details-page-successfully",
});
