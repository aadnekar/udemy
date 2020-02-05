class Weather {
  constructor(lat, lon) {
    this.apiKey = 'Trial';
    this.lat = lat;
    this.lon = lon;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=${this.lat}&lon=${this.lon}`,
      {mode: 'cors'}
    );

    const responseData = await response.text();

    return responseData;
  }

  // Change weather location
  changeLocation(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
}