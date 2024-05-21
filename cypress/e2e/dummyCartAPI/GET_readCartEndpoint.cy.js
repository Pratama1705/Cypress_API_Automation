describe('API Testing - Get JSON Cart', () => {
  const baseAPI = 'https://dummyjson.com';

  it('GET - All Carts', () => {
    cy.request({
      method: 'GET',
      url: `${baseAPI}/carts`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('carts');

      // Verify response object
      const carts = res.body.carts;
      carts.forEach((key_carts) => {
        // Response cart should have id and product object
        expect(key_carts).to.have.property('id');
        expect(key_carts).to.have.property('products');

        // Response product should have id and product title
        const products = key_carts.products;
        products.forEach((key_products) => {
          expect(key_products).to.have.property('id');
          expect(key_products).to.have.property('title');
        });
      });
    });
  });

  it('GET - Correct Cart Based on ID', () => {
    const idCart = 5;
    const titleProducts = ['Orange Essence Food Flavou', 'Black Motorbike', 'Malai Maxi Dress', 'Square Sunglasses', 'Stainless Steel Women'];

    cy.request({
      method: 'GET',
      url: `${baseAPI}/carts/${idCart}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(200);

      // Verify response structure cart
      expect(res.body).to.have.property('products');

      // Verify value of response
      expect(res.body.id).to.eq(idCart);

      // Response cart should have id and product title
      const products = res.body.products;
      products.forEach((key_products, index) => {
        expect(key_products).to.have.property('id');
        expect(key_products).to.have.property('title');

        // Ensure title is same based on list
        expect(key_products.title).to.eq(titleProducts[index]);
      });
    });
  });

  it('GET - Not Found ID Cart', () => {
    const idCart = 9999;

    cy.request({
      method: 'GET',
      url: `${baseAPI}/carts/${idCart}`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status response
      expect(res.status).to.eq(404);

      // Verify structure response and message
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.eq(`Cart with id '${idCart}' not found`);
    });
  });
});
