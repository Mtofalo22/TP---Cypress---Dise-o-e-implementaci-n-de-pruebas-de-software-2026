describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://app.bookdb.online/')
  })
})

describe('Casos de prueba de FRONT', () => {

  it('Comprar carrito exitosamente y visualizar orden de compra', () => {

    //Precondicion
    cy.request({
      method: 'DELETE',
      url: 'https://app.bookdb.online/api/shoppingcart/2136', // cambiar el user id ingresando a un usuario nuestro
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: ''
      }
    }).then((response) => {
      expect(response.status).to.eq(200)})
    
    //Accion paso 1:
    cy.visit('https://app.bookdb.online/login')
    cy.get('input[formcontrolname="username"]').type('gabimart')
    cy.get('input[formcontrolname="password"]').type('aB123456')
    cy.get('app-login button').contains('Login').click()

    //Respuesta del sistema paso 1:
    cy.url().should('include', 'https://app.bookdb.online/')
    cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    cy.get('#mat-badge-content-0').contains('0').should('be.visible')

    //Accion paso 2:
    cy.get('button').contains('Add to Cart').click()

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
    cy.get('app-my-orders table tbody tr:nth-child(2)').contains('Harry Potter and the Chamber of Secrets').should('be.visible');
  })

   it('Agregar productos a la lista de favoritos correctamente | Gabriel Martinez', () => {
    //Precondicion
    cy.request({
      method: 'DELETE',
      url: 'https://app.bookdb.online/api/Wishlist/2136',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FiaW1hcnQiLCJzdWIiOiJVc2VyIiwianRpIjoiNGQxYTU0NzMtYmU1MS00NTkyLWE3ZjQtMGIxNjhmOGViMzhhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsInVzZXJJZCI6IjIxMzYiLCJleHAiOjE3OTI5NTY4NjMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY0LyJ9._ghReHGPbB2M6G5rOuKNMEhF2jQJAy2Fh8mTIH3x5NQ'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)})

    //Accion paso 1:
    cy.visit('https://app.bookdb.online/login')
    cy.get('input[formcontrolname="username"]').type('gabimart')
    cy.get('input[formcontrolname="password"]').type('aB123456')
    cy.get('app-login button').contains('Login').click()

    //Respuesta del sistema paso 1:
    cy.url().should('include', 'https://app.bookdb.online/')
    cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    cy.get('#mat-badge-content-1').contains('0').should('be.visible')

    //Accion paso 2:
    cy.get('app-book-card .favourite').first().should('be.visible').click();

    //Respuesta del sistema paso 2:
    cy.get('#mat-badge-content-1').contains('1').should('be.visible')
    cy.contains('Added to Wishlist!!!').should('be.visible')

    //Accion paso 3:
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('favorite').click()
    
    //Respuesta del sistema paso 3:
    cy.url().should('include', 'https://app.bookdb.online/wishlist')
    cy.get('app-wishlist table tbody tr').contains('a', 'Harry Potter and the Chamber of Secrets').should('be.visible');
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