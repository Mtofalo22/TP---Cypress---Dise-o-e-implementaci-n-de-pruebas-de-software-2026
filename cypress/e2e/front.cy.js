import user from "../fixtures/user.json";
import urls from "../fixtures/urls.json";
import toast from "../fixtures/toast.json";
const pageLogin = require("../support/page_objects/pageLogin");
const pageHome = require("../support/page_objects/pageHome");
const componentNav = require("../support/page_objects/componentNav");
const pageCart = require("../support/page_objects/pageCart");
const pageCheckOut = require("../support/page_objects/pageCheckOut");
const pageOrders = require("../support/page_objects/pageOrders");
const pageWishlist = require('../support/page_objects/pageWishlist')

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
    cy.get("app-book-card").contains("Slayer").should("be.visible");

    // Acción paso 2:
    cy.get("app-book-card")
      .contains("Slayer")
      .parents("app-book-card")
      .find("mat-card")
      .click();

    //Respuesta del sistema paso 2:
    cy.get("app-book-details mat-card mat-card-content")
      .contains("Slayer")
      .should("be.visible");

    //accion paso 3:
    cy.contains("button", "Add to Cart").click();

    //Respuesta del sistema paso 3:
    cy.get(
      ".mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed",
    )
      .contains("shopping_cart")
      .click();

    cy.contains("One Item added to cart").should("be.visible");

    cy.get("app-shoppingcart table tbody tr")
      .contains("td", "Slayer")
      .should("be.visible");

    //Accion paso 4:

    cy.get("app-shoppingcart button").contains("Clear cart").click();

    //Respuesta del sistema paso 4:
    cy.get("app-shoppingcart")
      .contains("Your shopping cart is empty.")
      .should("be.visible");
  });
    
   it('Agregar productos a la lista de favoritos correctamente | Gabriel Martinez', () => {
    //Precondicion
    cy.deleteAllProductToWishlistAPI(user.userId, user.token)

    //Accion paso 1:
    cy.visit(urls.login);
    cy.login(user.name, user.password);

    //Respuesta del sistema paso 1:
    cy.url().should('include', urls.home)
    pageHome.isBookVisible('Harry Potter and the Chamber of Secrets');
    componentNav.validationNumberWishlistBadge('0')

    //Accion paso 2:
    pageHome.clickAddToWishlistButton()

    //Respuesta del sistema paso 2:
    componentNav.validationNumberWishlistBadge('1')
    pageHome.isToastVisible(toast.addToWishlistToast)

    //Accion paso 3:
    componentNav.clickOnWishlistBadge()
    
    //Respuesta del sistema paso 3:
    cy.url().should('include', urls.wishlist)
    pageWishlist.checkBookOnWishlist('Harry Potter and the Chamber of Secrets')
  });

 
});
