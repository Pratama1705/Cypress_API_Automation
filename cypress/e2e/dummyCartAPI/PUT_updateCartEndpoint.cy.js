describe('API Testing - Update JSON Cart', () => {
  const baseAPI = 'https://dummyjson.com';

  it('PUT - Correct Update Carts', () => {
    const idCart = 5;
    const body = {
      merge: true,
      products: [
        {
          id: 23,
          quantity: 100,
        },
      ],
    };

    cy.request({
      method: 'PUT',
      url: `${baseAPI}/carts/${idCart}`,
      failOnStatusCode: false,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('products');

      // Verify stored to carts correct product
      const products = res.body.products;
      products.forEach((key_products) => {
        if (key_products.id == body.products[0].id) {
          expect(key_products.quantity).to.eq(100);
        }
      });
    });
  });

  it('PUT - Not Found ID Update Carts', () => {
    const idCart = 99999;
    const body = {
      merge: true,
      products: [
        {
          id: 23,
          quantity: 100,
        },
      ],
    };

    cy.request({
      method: 'PUT',
      url: `${baseAPI}/carts/${idCart}`,
      failOnStatusCode: false,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(404);

      // Verify structure response and message
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.eq(`Cart with id '${idCart}' not found`);
    });
  });
});
