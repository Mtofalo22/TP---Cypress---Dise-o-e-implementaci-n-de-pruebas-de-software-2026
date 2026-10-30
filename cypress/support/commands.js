const pageLogin = require("../support/page_objects/pageLogin");

Cypress.Commands.add("login", (name, password) => {
  pageLogin.typeUserName(name);
  pageLogin.typeUserPassword(password);
  pageLogin.clickLoginButton();
});

Cypress.Commands.add("deleteCartAPI", (userId, token, codeResponse) => {
  cy.request({
    method: "DELETE",
    url: `https://app.bookdb.online/api/shoppingcart/${userId}`,
    failOnStatusCode: false,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: token,
    },
    body: {},
  }).then((deleteResponse) => {
    expect(deleteResponse.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add("postCheckOutAPI", (userId, token, codeResponse) => {
  cy.request({
    method: "POST",
    url: `https://app.bookdb.online/api/CheckOut/${userId}`,
    failOnStatusCode: false, // importante para que cypress no falle automaticamente ante un error 400 o 500
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: token,
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
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add("addItemToCartAPI", (userId, token, codeResponse) => {
  cy.request({
    method: "POST",
    url: `https://app.bookdb.online/api/shoppingcart/addToCart/${userId}/6`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: token,
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
    expect(postResponse.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add("deleteCartAPI", (userId, token, codeResponse) => {
  cy.request({
    method: "DELETE",
    url: `https://app.bookdb.online/api/shoppingcart/${userId}`,
    failOnStatusCode: false,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: token,
    },
    body: {},
  }).then((deleteResponse) => {
    expect(deleteResponse.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add(
  "deleteEspecificCartItemAPI",
  (userId, idBook, token, codeResponse) => {
    cy.request({
      method: "DELETE",
      url: `https://app.bookdb.online/api/shoppingcart/${userId}/`,
      failOnStatusCode: false,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: token,
      },
      body: {},
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(codeResponse);
    });
  },
);

Cypress.Commands.add("completeCheckOutForm", () => {
  cy.get('input[formcontrolname="name"]').type("Rhaenyra");
  cy.get('input[formcontrolname="addressLine1"]').type("Kingslanding");
  cy.get('input[formcontrolname="addressLine2"]').type("Landingpage");
  cy.get('input[formcontrolname="pincode"]').type("112345");
  cy.get('input[formcontrolname="state"]').type("Westeros");
});

Cypress.Commands.add('deleteAllProductToWishlistAPI', (userId, token) => {

cy.request({
      method: 'DELETE',
      url: `https://app.bookdb.online/api/Wishlist/${userId}`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)})

})

Cypress.Commands.add('addProductToWishlistAPI', (userId, numberOfBook, token, codeResponse) => {

cy.request({
            method: 'POST',
            url: `https://app.bookdb.online/api/Wishlist/ToggleWishlist/${userId}/${numberOfBook}`,
            failOnStatusCode: false, 
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: token
            },
        }).then((response) => {
      expect(response.status).to.eq(codeResponse)})

})
