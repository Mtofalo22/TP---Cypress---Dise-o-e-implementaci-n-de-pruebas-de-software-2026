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
      url: 'https://app.bookdb.online/api/shoppingcart/1058', // cambiar el user id ingresando a un usuario nuestro
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: ''
      }
    }).then((response) => {
      expect(response.status).to.eq(200)})
    
    //Accion paso 1:
    cy.visit('https://app.bookdb.online/login')
    cy.get('input[formcontrolname="username"]').type('Auto')
    cy.get('input[formcontrolname="password"]').type('Auto12345')
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
  })

  it('Titulo caso de prueba 2 | Completar', () => {
  })

  it('Titulo caso de prueba 3 | Completar', () => {
  })

  it('Titulo caso de prueba 4 | Completar', () => {
  })

  it('Titulo caso de prueba 5 | Completar ', () => {
  })

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
  
})