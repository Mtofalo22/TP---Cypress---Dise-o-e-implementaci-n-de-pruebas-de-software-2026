class pageCheckOut {
  isBookVisibleAtCheck(bookName) {
    cy.get("table tbody tr")
      .contains("td", bookName)
      .should("be.visible");
    cy.get("form").should("be.visible");
  }

  clickPlaceOrderButton() {
    cy.get("button").contains("Place Order").click();
  }
}
module.exports = new pageCheckOut();
