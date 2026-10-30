class PageDetails {
  visibleBookDetails(bookName) {
    cy.get("app-book-details mat-card mat-card-content")
      .contains(bookName)
      .should("be.visible");
    
  }

  clickOnAddToCart() {
    cy.contains("button", "Add to Cart").click();
  }
}
module.exports = new PageDetails();
