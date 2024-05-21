describe('API Testing - Add JSON Cart', () => {
  const baseAPI = 'https://dummyjson.com';

  it('POST - Correct add Product to Carts', () => {
    const body = {
      userId: 100,
      products: [
        {
          id: 10,
          quantity: 10,
        },
        {
          id: 11,
          quantity: 50,
        },
      ],
    };
    const titleProducts = ['HP Pavilion 15-DK1056WM', 'perfume Oil'];

    cy.request({
      method: 'POST',
      url: `${baseAPI}/carts/add`,
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
      products.forEach((key_products, index) => {
        expect(key_products.title).to.eq(titleProducts[index]);
      });
    });
  });

  it('POST - Unknown Add Product to Carts', () => {
    const body = {
      userId: 100,
      products: [
        {
          id: 23132,
          quantity: 10,
        },
        {
          id: 32132,
          quantity: 50,
        },
      ],
    };

    cy.request({
      method: 'POST',
      url: `${baseAPI}/carts/add`,
      failOnStatusCode: false,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('products');

      // Verify there is stored products to carts
      expect(res.body.products.length).to.eq(0);
    });
  });

  it('POST - Incomplete JSON (Only ID) Add Product to Carts', () => {
    const body = {
      userId: 100,
      products: [
        {
          id: 10,
        },
      ],
    };

    cy.request({
      method: 'POST',
      url: `${baseAPI}/carts/add`,
      failOnStatusCode: false,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('products');

      // Verify product still stored but qty by default is 1
      const products = res.body.products;
      products.forEach((key_products) => {
        expect(key_products.quantity).to.eq(1);
      });
    });
  });
});
