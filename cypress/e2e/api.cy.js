import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {

    it('API | Comprar carrito exitosamente', () => {

        cy.postCheckOutAPI(user.userId, user.token, 200)
      
    })

    it('API | Error al comprar carrito sin token', () => {

        cy.postCheckOutAPI(user.userId, '', 401)

    })

    it('API | Agregar producto a favorito exitosamente | Gabriel Martinez', () => {

        cy.addProductToWishlistAPI(user.userId, 2, user.token, 200)
    })

    it('API | Error al agregar producto a favoritos sin token | Gabriel Martinez', () => {

        cy.addProductToWishlistAPI(user.userId, 2, '', 401)
    })

    it.skip('Titulo caso de prueba API 2 | Completar', () => {
    })

    it.skip('Titulo caso de prueba API 3 | Completar', () => {
    })


})