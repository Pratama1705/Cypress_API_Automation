describe('API Testing - Current Weather', () => {
  const baseAPI = 'https://api.weatherbit.io/v2.0';
  const API_KEY_BASE = Cypress.env('API_KEY_BASE');

  it('GET - Correct Lattitude & Longitude', () => {
    const lat = '40.73061';
    const lon = '-73.935242';

    cy.request({
      method: 'GET',
      url: `${baseAPI}/current?lat=${lat}&lon=${lon}&key=${API_KEY_BASE}`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('data');
      expect(res.body.data[0]).to.have.property('state_code');

      // Get state_code & verify
      const state_code_result = res.body.data[0].state_code;
      expect(state_code_result).to.eq('NY');
    });
  });

  it('GET - False Lattitude & Longitude', () => {
    const lat = 'noodle';
    const lon = 'beef';

    cy.request({
      method: 'GET',
      url: `${baseAPI}/current?lat=${lat}&lon=${lon}&key=${API_KEY_BASE}`,
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

  it('GET - Valid City ID', () => {
    const city_id = '4487042';

    cy.request({
      method: 'GET',
      url: `${baseAPI}/current?city_id=${city_id}&key=${API_KEY_BASE}`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('data');

      // Get response city_name
      const city_name = res.body.data[0].city_name;
      expect(city_name).to.eq('Raleigh');
    });
  });

  it('GET - Invalid City ID', () => {
    const city_id = 'notvalid';

    cy.request({
      method: 'GET',
      url: `${baseAPI}/current?city_id=${city_id}&key=${API_KEY_BASE}`,
      failOnStatusCode: false,
    }).then((res) => {
      // Verify status code
      expect(res.status).to.eq(500);

      // Verify response API
      expect(res.body).to.have.property('error');

      // Get response error
      const error_response = res.body.error;
      expect(error_response).to.eq('Internal DB Error.');
    });
  });
});
