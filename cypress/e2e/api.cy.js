import user from "../fixtures/user.json";


describe("Casos de prueba de APIs", () => {
  it("API | Comprar carrito exitosamente", () => {
    cy.postCheckOutAPI(user.userId, user.token, 200);
  });

  it("API | Error al comprar carrito sin token", () => {
    cy.postCheckOutAPI(user.userId, "", 401);
  });

  it("API | Agregar producto al carrito y luego eliminarlo - Tofalo Mauricio Oscar", () => {
    // 1. POST
    cy.addItemToCartAPI(user.userId, user.token, 200);
    // 2. DELETE
    cy.deleteCartAPI(user.userId, user.token, 200);
  });

  it("API | Error al intentar eliminar un producto inexistente del carrito - Tofalo Mauricio Oscar", () => {
    cy.deleteCartAPI(user.userId, user.token, 200);
    cy.deleteEspecificCartItemAPI(user.userId, user.token, 6, 404);
  });

  it('API | Agregar producto a favorito exitosamente | Gabriel Martinez', () => {

    cy.addProductToWishlistAPI(user.userId, 2, user.token, 200)
  })

  it('API | Error al agregar producto a favoritos sin token | Gabriel Martinez', () => {

    cy.addProductToWishlistAPI(user.userId, 2, '', 401)
  })
});
