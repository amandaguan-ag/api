import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// Business Logic

function getWeather(city, countryCode, zipCode) {
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
      printElements(response, city); //And if it was, call a function to print the data we received from the API
    } else {
      printError(this, response, city); //this represents the XMLHttpRequest object//response: Custom Error Messages from an API//city make our error message more descriptive.
    }
  });

  request.open("GET", url, true); //making a request(method of the request, URL, boolean for whether the request should be asynchronous or not.)//async, because we don't want the browser to freeze up for our users
  request.send(); //Once we've opened the request, we send it//wait for the API to return a response. Once it does, our callback function attached to the "loadend"
}

// function getWind(city, countryCode, zipCode) {
//   let request = new XMLHttpRequest();
//   let url;
//   if (zipCode) {
//     url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.API_KEY}`;
//   } else {
//     url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${process.env.API_KEY}`;
//   }

//   request.addEventListener("loadend", function () {
//     const response = JSON.parse(this.responseText);
//     if (this.status === 200) {
//       printWind(response, city);
//     } else {
//       printError(this, response, city);
//     }
//   });

//   request.open("GET", url, true);
//   request.send();
// }

// function getForecast(city, countryCode, zipCode) {
//   let request = new XMLHttpRequest();
//   let url;
//   if (zipCode) {
//     url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&appid=${process.env.API_KEY}`;
//   } else {
//     url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${process.env.API_KEY}`;
//   }

//   request.addEventListener("loadend", function () {
//     const response = JSON.parse(this.responseText);
//     if (this.status === 200) {
//       printForecast(response, city);
//     } else {
//       printError(this, response, city);
//     }
//   });

//   request.open("GET", url, true);
//   request.send();
// }

// function getUVIndex(city, countryCode, zipCode) {
//   let request = new XMLHttpRequest();
//   let url;
//   if (zipCode) {
//     url = `http://api.openweathermap.org/data/2.5/uvi?zip=${zipCode},${countryCode}&appid=${process.env.API_KEY}`;
//   } else {
//     url = `http://api.openweathermap.org/data/2.5/uvi?q=${city},${countryCode}&appid=${process.env.API_KEY}`;
//   }

//   request.addEventListener("loadend", function () {
//     const response = JSON.parse(this.responseText);
//     if (this.status === 200) {
//       printUVIndex(response, city);
//     } else {
//       printError(this, response, city);
//     }
//   });

//   request.open("GET", url, true);
//   request.send();
// }

// UI Logic

function printElements(apiResponse) {
  const tempFahrenheit = apiResponse.main.temp * 1.8 - 459.67;
  document.querySelector(
    "#showResponse"
  ).innerHTML = `<div><p>The weather condition is ${
    apiResponse.weather[0].description
  }.</p><p>The temperature in Fahrenheit is ${tempFahrenheit.toFixed(
    1
  )} degrees.</p><p>The humidity is ${apiResponse.main.humidity}%.</p></div>`;
}

// function printWind(apiResponse, city) {
//   document.querySelector(
//     "#showResponse"
//   ).innerHTML = `<div><p>The wind speed in ${city} is ${apiResponse.wind.speed} meters per second.</p><p>The direction is ${apiResponse.wind.deg} degrees.</p></div>`;
// }

// function printForecast(apiResponse) {
//   const forecastList = apiResponse.list;
//   let forecastHtml = `<div><h5>5-Day Forecast</h5><div class="row">`;
//   for (let i = 0; i < forecastList.length; i += 8) {
//     //OpenWeatherMap API provides weather forecasts in 3-hour increments, so selecting every eighth element gives us a forecast for every 24 hours.
//     const forecast = forecastList[i];
//     const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString(); //dt is a Unix timestamp representing the time of the forecast//in seconds, to milliseconds so it can be used to create a Date object//toLocaleDateString() method to create a human-readable string
//     const forecastTemp = forecast.main.temp * 1.8 - 459.67;
//     forecastHtml += `<div class="col-2"> <p>${forecastDate}</p> <img src="http://openweathermap.org/img/w/${
//       forecast.weather[0].icon
//     }.png" alt="weather icon"> <p>${
//       forecast.weather[0].description
//     }</p> <p>${forecastTemp.toFixed(1)}&deg;F</p> </div>`;
//   }
//   forecastHtml += `</div></div>`; //After the loop completes, the function adds the closing tags for the HTML code
//   document.querySelector("#showResponse").innerHTML = forecastHtml;
// }

// function printUVIndex(apiResponse, city) {
//   document.querySelector(
//     "#showResponse"
//   ).innerHTML = `<div><p>The UV index in ${city} is ${apiResponse.value}.</p></div>`;
// }

function printError(request, apiResponse, city) {
  document.querySelector(
    "#showResponse"
  ).innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector("#location").value;
  const countryCode = document.querySelector("#country-code").value;
  const zipCode = document.querySelector("#zip-code").value;
  document.querySelector("#location").value = null;
  document.querySelector("#country-code").value = null;
  document.querySelector("#zip-code").value = null;
  getWeather(city);
  //   getWind(city, countryCode, zipCode);
  //   getForecast(city, countryCode, zipCode);
  //   getUVIndex(city, countryCode, zipCode);
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
