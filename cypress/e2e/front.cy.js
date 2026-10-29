import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
import toast from '../fixtures/toast.json'
const pageLogin = require('../support/page_objects/pageLogin')
const pageHome = require('../support/page_objects/pageHome')
const pageWishlist = require('../support/page_objects/pageWishlist')
const componentNav = require('../support/page_objects/componentNav')

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://app.bookdb.online/')
  })
})

describe('Casos de prueba de FRONT', () => {

  it.skip('Comprar carrito exitosamente y visualizar orden de compra', () => {

    //Precondicion
    cy.deleteCartAPI(user.userId)
    
    //Accion paso 1:
    cy.visit(url.login)
    pageLogin.typeUserName(user.name);
    pageLogin.typeUserPassword(user.password);
    pageLogin.clickLoginButton();

    //Respuesta del sistema paso 1:
    cy.url().should('include', url.home)
    pageHome.isBookVisible();
    //cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    componentNav.validationNumberCartBadge('0')
    //cy.get('#mat-badge-content-0').contains('0').should('be.visible')
    
    //Accion paso 2:
    pageHome.clickAddToCartButton();
    //cy.get('button').contains('Add to Cart').click()

    //Respuesta del sistema paso 2:
    cy.contains('One Item added to cart').should('be.visible')
    cy.get('#mat-badge-content-0').contains('1').should('be.visible')

    //Accion paso 3:
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()

    //Respuesta del sistema paso 3:
    cy.get('app-shoppingcart table tbody tr').contains('td', 'Harry Potter and the Chamber of Secrets').should('be.visible');

    //Accion paso 4:
    cy.get('button').contains('CheckOut').click()

    //Respuesta del sistemas paso 4:
    cy.url().should('include', 'https://app.bookdb.online/checkout')
    cy.get('table tbody tr').contains('td', 'Harry Potter and the Chamber of Secrets').should('be.visible');
    cy.get('form').should('be.visible');

    //Accion paso 5:
    cy.get('input[formcontrolname="name"]').type('Rhaenyra')
    cy.get('input[formcontrolname="addressLine1"]').type('Kingslanding')
    cy.get('input[formcontrolname="addressLine2"]').type('Landingpage')
    cy.get('input[formcontrolname="pincode"]').type('112345')
    cy.get('input[formcontrolname="state"]').type('Westeros')

    //Accion paso 6:
    cy.get('button').contains('Place Order').click()

    //Respuesta del sistema paso 6:
    cy.get('app-my-orders table tbody tr').should('have.length.at.least', 1); //Revisar
    cy.url().should('include', 'https://app.bookdb.online/myorders')


    //Accion paso 7:
    cy.get('app-my-orders table tbody tr').first().should('be.visible').click();

    //Respuesta del sistema paso 7:
    cy.get('app-my-orders table tbody tr:nth-child(2)').contains('Harry Potter and the Prisoner of Azkaban').should('be.visible');
  })

   it('Agregar productos a la lista de favoritos correctamente | Gabriel Martinez', () => {
    //Precondicion
    cy.deleteAllProductToWishlistAPI(user.userId, user.token)

    //Accion paso 1:
    cy.visit(url.login)
    pageLogin.typeUserName(user.name);
    pageLogin.typeUserPassword(user.password);
    pageLogin.clickLoginButton();

    //Respuesta del sistema paso 1:
    cy.url().should('include', url.home)
    pageHome.isBookVisible();
    componentNav.validationNumberWishlistBadge('0')

    //Accion paso 2:
    pageHome.clickAddToWishlistButton()

    //Respuesta del sistema paso 2:
    componentNav.validationNumberWishlistBadge('1')
    pageHome.isToastVisible(toast.addToWishlistToast)

    //Accion paso 3:
    componentNav.clickOnWishlistBadge()
    
    //Respuesta del sistema paso 3:
    cy.url().should('include', url.wishlist)
    pageWishlist.checkBookOnWishlist('Harry Potter and the Chamber of Secrets')
  })

  it.skip('Titulo caso de prueba 2 | Completar', () => {
  })

  it.skip('Titulo caso de prueba 3 | Completar', () => {
  })

  it.skip('Titulo caso de prueba 4 | Completar', () => {
  })

  it.skip('Titulo caso de prueba 5 | Completar ', () => {
  })

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
  
})