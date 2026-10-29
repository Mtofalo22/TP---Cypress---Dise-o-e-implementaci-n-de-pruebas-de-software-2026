class pageWishlist {

    checkBookOnWishlist(nameBook) {
        cy.get('app-wishlist table tbody tr').contains('a', nameBook).should('be.visible');
    }

} module.exports = new pageWishlist();