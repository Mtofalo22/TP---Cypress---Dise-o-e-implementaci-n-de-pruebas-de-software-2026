import user from "../fixtures/user.json";
import urls from "../fixtures/urls.json";
import toast from "../fixtures/toast.json";
const pageLogin = require("../support/page_objects/pageLogin");
const pageHome = require("../support/page_objects/pageHome");
const componentNav = require("../support/page_objects/componentNav");
const pageCart = require("../support/page_objects/pageCart");
const pageCheckOut = require("../support/page_objects/pageCheckOut");
const pageOrders = require("../support/page_objects/pageOrders");
const pageDetails = require("../support/page_objects/pageDetails");

describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://app.bookdb.online/");
  });
});

describe("Casos de prueba de FRONT", () => {
  it("Comprar carrito exitosamente y visualizar orden de compra", () => {
    //Precondicion
    cy.deleteCartAPI(user.userId, user.token, 200);
    //Accion paso 1:
    cy.visit(urls.login);
    cy.login(user.name, user.password);
    //Respuesta del sistema paso 1:
    cy.url().should("include", urls.home);
    pageHome.isBookVisible("Harry Potter and the Prisoner of Azkaban");
    componentNav.validationNumberCartBadge("0");
    //Accion paso 2:
    pageHome.clickAddToCartButton();
    //Respuesta del sistema paso 2:
    pageHome.isToastVisible(toast.addToCartToast);
    componentNav.validationNumberCartBadge("1");
    //Accion paso 3:
    componentNav.clickOnCartIcon();
    //Respuesta del sistema paso 3:
    pageCart.bookVisibleAtCart("Harry Potter and the Prisoner of Azkaban");
    //Accion paso 4:
    pageCart.clickOnCheckOut();
    //Respuesta del sistemas paso 4:
    cy.url().should("include", urls.checkout);
    pageCheckOut.isBookVisibleAtCheck(
      "Harry Potter and the Prisoner of Azkaban",
    );
    //Accion paso 5:
    cy.completeCheckOutForm();
    //Accion paso 6:
    pageCheckOut.clickPlaceOrderButton();
    //Respuesta del sistema paso 6:
    cy.url().should("include", urls.myOrders);
    pageOrders.visibleOrder();
    //Accion paso 7:
    pageOrders.clickOnFirstOrder();
    //Respuesta del sistema paso 7:
    pageOrders.buyedBookVisible("Harry Potter and the Prisoner of Azkaban");
  });

  it("Limpiar completamente el carrito - Tofalo Mauricio Oscar", () => {
    //Precondicion
    cy.deleteCartAPI(user.userId, user.token, 200);
    //Accion paso 1:
    cy.visit(urls.login);
    cy.login(user.name, user.password);
    // Respuesta del sistema paso 1:
    cy.url().should("include", urls.home);
    pageHome.isBookVisible("Slayer");
    // Acción paso 2:
    pageHome.clickOnSpecificBookCard("Slayer");
    //Respuesta del sistema paso 2:
    pageDetails.visibleBookDetails("Slayer");
    //accion paso 3:
    pageDetails.clickOnAddToCart();
    //Respuesta del sistema paso 3:
    pageHome.isToastVisible(toast.addToCartToast);
    //Accion paso 4:
    componentNav.clickOnCartIcon();
    //Respuesta del sistema paso 4:
    pageCart.bookVisibleAtCart("Slayer");
    //Accion paso 5:
    pageCart.clickOnClearCart();
    //Respuesta del sistema paso 5:
    pageCart.cartEmpty();
    pageHome.isToastVisible(toast.carClearedToast);
  });

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
});
