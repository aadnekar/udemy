// Location overview
locations = {
  "oslo": {
    "lat": 59.933333,
    "lon": 10.716667
  },
  "trondheim": {
    "lat": 63.389444,
    "lon": 10.40345
  },
  "sandefjord": {
    "lat": 59.13118,
    "lon": 10.21665
  }
};

// Get lat and lon location of a city
function getLocation(city) {
  city = city.toLowerCase();
  return [locations[city].lat, locations[city].lon];
}

// Init Weather object
const weather = new Weather(getLocation("sandefjord"));

// weather.changeLocation()

weather.getWeather()
  .then(data => {
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml");
    const w = xml.querySelector('.pointData')
    const w2 = w.firstElementChild
    const w3 = w2.querySelector('temperature')
    console.log(w);
    console.log(w2);
    console.log(w3.getAttribute('value'));
  })
  .catch(err => console.log(err));