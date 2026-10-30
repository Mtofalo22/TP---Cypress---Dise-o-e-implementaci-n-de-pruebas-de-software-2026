class pageHome {
  isBookVisible(bookName) {
    cy.get("app-book-card").contains(bookName).should("be.visible");
  }

  clickAddToCartButton() {
    cy.get(
      "body > app-root > div > app-home > div > div.col.mb-3 > div > div:nth-child(2) > app-book-card > mat-card > mat-card-content > app-addtocart > button",
    ).click();
  }

  clickAddToWishlistButton() {
    cy.get('app-book-card .favourite').first().should('be.visible').click();
  }

  isToastVisible(message) {
    cy.contains(message).should("be.visible");
  }

  clickOnSpecificBookCard(bookName){
     cy.get("app-book-card")
      .contains(bookName)
      .parents("app-book-card")
      .find("mat-card")
      .click();
  }


}
module.exports = new pageHome();

