class PageCart {
  bookVisibleAtCart(bookName) {
    cy.get("app-shoppingcart table tbody tr")
      .contains("td", bookName)
      .should("be.visible");
  }

  cartEmpty() {
    cy.get("app-shoppingcart")
      .contains("Your shopping cart is empty.")
      .should("be.visible");
  }

  clickOnCheckOut() {
    cy.get("button").contains("CheckOut").click();
  }

  clickOnClearCart() {
    cy.get("button").contains("Clear cart").click();
  }

}
module.exports = new PageCart();
