class componentNav {

    validationNumberCartBadge(cant) {
        cy.get('#mat-badge-content-0').contains(cant).should('be.visible')
    }

    validationNumberWishlistBadge(cant) {
        cy.get('#mat-badge-content-1').contains(cant).should('be.visible')
    }

    clickOnWishlistBadge() {
        cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('favorite').click()
    }


} module.exports = new componentNav();