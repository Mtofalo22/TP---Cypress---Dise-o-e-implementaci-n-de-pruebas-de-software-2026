describe("Casos de prueba de APIs", () => {
  it("API | Comprar carrito exitosamente", () => {
    cy.request({
      method: "POST",
      url: "https://app.bookdb.online/api/CheckOut/4128",
      failOnStatusCode: false, // importante para que cypress no falle automaticamente ante un error 400 o 500
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF1dCIsInN1YiI6IlVzZXIiLCJqdGkiOiJiMGFjM2RmMi01NGRiLTQ1MmEtOGQ1ZS0zYmE4NjlhYzZmY2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwidXNlcklkIjoiNDEyOCIsImV4cCI6MTc5Mjk2OTg2NSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjQvIn0.ykQ_Gt19aj80DOu5GX1OsuI_iTvxSOwqaQ6Xyt22OA4",
      },
      body: {
        orderDetails: [
          {
            book: {
              bookId: 3,
              title: "Harry Potter and the Prisoner of Azkaban",
              author: "JKR",
              category: "Romance",
              price: 213,
              coverFileName: "c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg",
            },
            quantity: 1,
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("API | Error al comprar carrito sin token", () => {
    cy.request({
      method: "POST",
      url: "https://app.bookdb.online/api/CheckOut/4128",
      failOnStatusCode: false, // importante para que cypress no falle automaticamente ante un error 400 o 500
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "", //este caso de prueba pedia no brindar token para que salte el error 401
      },
      body: {
        orderDetails: [
          {
            book: {
              bookId: 3,
              title: "Harry Potter and the Prisoner of Azkaban",
              author: "JKR",
              category: "Romance",
              price: 213,
              coverFileName: "c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg",
            },
            quantity: 1,
          },
        ],
        cartTotal: 213,
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("API | Agregar producto al carrito y luego eliminarlo - Tofalo Mauricio Oscar", () => {
    // 1. POST
    cy.request({
      method: "POST",
      url: "https://app.bookdb.online/api/shoppingcart/addToCart/4128/6",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF1dCIsInN1YiI6IlVzZXIiLCJqdGkiOiJiMGFjM2RmMi01NGRiLTQ1MmEtOGQ1ZS0zYmE4NjlhYzZmY2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwidXNlcklkIjoiNDEyOCIsImV4cCI6MTc5Mjk2OTg2NSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjQvIn0.ykQ_Gt19aj80DOu5GX1OsuI_iTvxSOwqaQ6Xyt22OA4`,
      },
      body: {
        orderDetails: [
          {
            book: {
              bookId: 6,
              title: "Harry Potter and the Half-Blood Prince",
              author: "JKR",
              category: "Fantasy",
              price: 433.0,
              coverFileName: "cff3d5ee-71f3-43d8-8625-33abcd48659eHP6.jpg",
            },
            quantity: 1,
          },
        ],
        cartTotal: 213,
      },
    }).then((postResponse) => {
      expect(postResponse.status).to.eq(200);
      // 2. DELETE
      cy.request({
        method: "DELETE",
        url: "https://app.bookdb.online/api/shoppingcart/4128/6",
        failOnStatusCode: false,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF1dCIsInN1YiI6IlVzZXIiLCJqdGkiOiJiMGFjM2RmMi01NGRiLTQ1MmEtOGQ1ZS0zYmE4NjlhYzZmY2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwidXNlcklkIjoiNDEyOCIsImV4cCI6MTc5Mjk2OTg2NSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjQvIn0.ykQ_Gt19aj80DOu5GX1OsuI_iTvxSOwqaQ6Xyt22OA4`,
        },
        body: {},
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
      });
    });
  });

  it("API | Error al intentar eliminar un producto inexistente del carrito - Tofalo Mauricio Oscar", () => {
    cy.request({
      method: "DELETE",
      url: "https://app.bookdb.online/api/shoppingcart/4128/6",
      failOnStatusCode: false, // Vital para que Cypress no falle automáticamente al recibir un error 4xx/5xx
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF1dCIsInN1YiI6IlVzZXIiLCJqdGkiOiJiMGFjM2RmMi01NGRiLTQ1MmEtOGQ1ZS0zYmE4NjlhYzZmY2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwidXNlcklkIjoiNDEyOCIsImV4cCI6MTc5Mjk2OTg2NSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjQvIn0.ykQ_Gt19aj80DOu5GX1OsuI_iTvxSOwqaQ6Xyt22OA4`,
      },
      body: {},
    }).then((response) => {
      expect(response.status).to.be.at.least(400);
    });
  });
});
