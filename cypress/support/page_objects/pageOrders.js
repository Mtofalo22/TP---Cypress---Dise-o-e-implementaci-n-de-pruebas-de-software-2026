class pageOrders {
  visibleOrder() {
    cy.get("app-my-orders table tbody tr").should("have.length.at.least", 1); //Revisar
  }
  clickOnFirstOrder() {
    cy.get("app-my-orders table tbody tr").first().should("be.visible").click();
  }
  buyedBookVisible(bookName) {
    cy.get("app-my-orders table tbody tr:nth-child(2)")
      .contains(bookName)
      .should("be.visible");
  }
}
module.exports = new pageOrders();
