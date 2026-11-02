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

  it.only("API | Agregar exitosamente un producto al carrito con UserID | Sofia Ferrari", () => {
    cy.addItemToCartAPI(user.userId, '', 200);

    //   cy.request({
    //     method: 'POST',
    //     url: 'https://app.bookdb.online/api/shoppingcart/addToCart/3129/2',
    //     failOnStatusCode: false,
    //     headers: {
    //       accept: 'application/json',
    //       'content-type': 'application/json',
    //       authorization: '',
    //      },
    //      body:
    //     {
    //     "orderDetails": [
    //     {
    //          "book": {
    //           "bookId": 2,
    //          "title": "Harry Potter and the Chamber of Secrets",
    //           "author": "JKR",
    //           "category": "Mystery",
    //           "price": 236.00,
    //            "coverFileName": "9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"
    //         },
    //        "quantity": 1
    //     }
    //    ],
    //    "cartTotal": 213
    //    }
    //  }).then((response) => {
    //    expect(response.status).to.eq(200)
    //  })

  });

  it("API | Error al agregar un producto al carrito sin UserID  | Sofia Ferrari", () => {

    cy.request({
      method: 'POST',
      url: 'https://app.bookdb.online/api/shoppingcart/addToCart/2',
      failOnStatusCode: false,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: '',
      },
      body:
      {
        "orderDetails": [
          {
            "book": {
              "bookId": 2,
              "title": "Harry Potter and the Chamber of Secrets",
              "author": "JKR",
              "category": "Mystery",
              "price": 236.00,
              "coverFileName": "9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"
            },
            "quantity": 1
          }
        ],
        "cartTotal": 213
      }
    }).then((response) => {
      expect(response.status).to.eq(405)
    })
  });

})
