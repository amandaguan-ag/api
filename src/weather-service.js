export default class WeatherService {
  static getWeather(city, countryCode, zipCode) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let url;
      if (zipCode) {
        url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.API_KEY}`;
      } else {
        url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${process.env.API_KEY}`;
      }
      request.addEventListener("loadend", function () {
        // fire when a request (API call) has been completed, whether or not it was successful.
        const response = JSON.parse(this.responseText); //Parse the API response//ensures that the data is properly formatted as JSON data
        if (this.status === 200) {
          //Check if the API call was successful//status is also a property of XMLHttpRequest objects
          resolve([response, city]); //And if it was, call a function to print the data we received from the API
        } else {
          reject([this, response, city]); //this represents the XMLHttpRequest object//response: Custom Error Messages from an API//city make our error message more descriptive.
        }
      });

      request.open("GET", url, true); //making a request(method of the request, URL, boolean for whether the request should be asynchronous or not.)//async, because we don't want the browser to freeze up for our users
      request.send(); //Once we've opened the request, we send it//wait for the API to return a response. Once it does, our callback function attached to the "loadend"
    });
  }
}
