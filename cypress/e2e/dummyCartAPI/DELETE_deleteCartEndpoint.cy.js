describe('API Testing - Delete JSON Cart', () => {
  const baseAPI = 'https://dummyjson.com';

  it('DELETE - Delete Cart', () => {
    const cartID = 1;

    cy.request({
      method: 'DELETE',
      url: `${baseAPI}/carts/${cartID}`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('products');
      expect(res.body).to.have.property('isDeleted');
      expect(res.body).to.have.property('deletedOn');

      // Verify flag deleted is true
      expect(res.body.isDeleted).to.eq(true);
    });
  });

  it('DELETE - Delete Cart Unknown ID', () => {
    const idCart = 99999;

    cy.request({
      method: 'DELETE',
      url: `${baseAPI}/carts/${idCart}`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(404);

      // Verify structure response and message
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.eq(`Cart with id '${idCart}' not found`);
    });
  });
});
