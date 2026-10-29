class PageCart {
  bookVisibleAtCart(bookName) {
    cy.get("app-shoppingcart table tbody tr")
      .contains("td", bookName)
      .should("be.visible");
  }

  clickOnCheckOut() {
    cy.get("button").contains("CheckOut").click();
  }
}
module.exports = new PageCart();
