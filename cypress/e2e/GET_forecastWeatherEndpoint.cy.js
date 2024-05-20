describe('API Testing - Forecast Weather', () => {
  const baseAPI = 'https://api.weatherbit.io/v2.0';
  const API_KEY_BASE = Cypress.env('API_KEY_BASE');

  it('GET - Correct Postal Code', () => {
    const postal_code = 28546;
    const datetime = [];
    const weather_icon = [];
    const weather_description = [];
    const weather_code = [];

    cy.request('GET', `${baseAPI}/forecast/daily?postal_code=${postal_code}&key=${API_KEY_BASE}`).then((res) => {
      // Verify status code
      expect(res.status).to.eq(200);

      // Verify response API
      expect(res.body).to.have.property('data');

      // Get datetime & weather information in each data & push to array
      const dataWeather = res.body.data;
      dataWeather.forEach((key) => {
        datetime.push(key.datetime);
        weather_icon.push(key.weather.icon);
        weather_description.push(key.weather.description);
        weather_code.push(key.weather.code);
      });

      // Check selected data array
      weather_code.forEach((data_weather_code) => {
        weather_description.forEach((data_weather_desc) => {
          cy.log(`${data_weather_code} ==> ${data_weather_desc}`);
        });
      });
    });
  });
});
