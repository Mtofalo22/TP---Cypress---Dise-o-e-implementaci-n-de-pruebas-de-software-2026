class pageHome {

    isBookVisible() {
        cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

    clickAddToCartButton() {
        cy.get('button').contains('Add to Cart').click()
    }

    clickAddToWishlistButton() {
        cy.get('app-book-card .favourite').first().should('be.visible').click();
    }

    isToastVisible(message) {
        cy.contains(message).should('be.visible')
    }


} module.exports = new pageHome();