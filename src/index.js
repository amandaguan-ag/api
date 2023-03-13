import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import WeatherService from "./weather-service.js";

// Business Logic

function getWeather(city, countryCode, zipCode) {
  let promise = WeatherService.getWeather(city, countryCode, zipCode);
  promise.then(
    function (weatherDataArray) {
      printElements(weatherDataArray);
    },
    function (errorArray) {
      printError(errorArray);
    }
  );
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

function printElements(data) {
  const tempFahrenheit = data.main.temp * 1.8 - 459.67;
  document.querySelector(
    "#showResponse"
  ).innerHTML = `<div><p>The weather condition is ${
    data.weather[0].description
  }.</p><p>The temperature in Fahrenheit is ${tempFahrenheit.toFixed(
    1
  )} degrees.</p><p>The humidity is ${data.main.humidity}%.</p></div>`;
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

function printError(error) {
  document.querySelector(
    "#showResponse"
  ).innerText = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector("#location").value;
  const countryCode = document.querySelector("#country-code").value;
  const zipCode = document.querySelector("#zip-code").value;
  document.querySelector("#location").value = null;
  document.querySelector("#country-code").value = null;
  document.querySelector("#zip-code").value = null;
  getWeather(city, countryCode, zipCode);
  //   getWind(city, countryCode, zipCode);
  //   getForecast(city, countryCode, zipCode);
  //   getUVIndex(city, countryCode, zipCode);
}

window.addEventListener("load", function () {
  document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
