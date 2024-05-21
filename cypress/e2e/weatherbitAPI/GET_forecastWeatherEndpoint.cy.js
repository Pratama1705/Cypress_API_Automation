describe('API Testing - Forecast Weather', () => {
  const baseAPI = 'https://api.weatherbit.io/v2.0';
  const API_KEY_BASE = Cypress.env('API_KEY_BASE');

  it('GET - Correct Lattitude & Longitude', () => {
    const lat = '40.73061';
    const lon = '-73.935242';

    cy.request({
      method: 'GET',
      url: `${baseAPI}/forecast/daily?lat=${lat}&lon=${lon}&key=${API_KEY_BASE}`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('data');
      expect(res.body.data[0]).to.have.property('weather');
    });
  });

  it('GET - False Lattitude & Longitude', () => {
    const lat = 'noodle';
    const lon = 'beef';

    cy.request({
      method: 'GET',
      url: `${baseAPI}/forecast/daily?lat=${lat}&lon=${lon}&key=${API_KEY_BASE}`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(400);

      // Verify response API
      expect(res.body).to.have.property('error');

      // Get response error
      const error_response = res.body.error;
      expect(error_response).to.eq('Invalid lat/lon supplied.');
    });
  });
});
