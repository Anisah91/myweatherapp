let currentdate = new Date();

const myElement = document.querySelector(".top .currentday");
myElement.innerHTML = "";

let hours = currentdate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentdate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = currentdate.getDate();

let seconds = currentdate.getSeconds();
let year = currentdate.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentdate.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentdate.getMonth()];

myElement.innerHTML = `${days[currentdate.getDay()]} ${hours}:${minutes}`;
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  days = ["Wednesday", "Thursday", "Friday", "Saturday"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
    <div class="col-2">
      <div class="weather-forecast-day">${formatDay(forecastDay.time)}</div>
      <div class="img-container">
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" alt="weather-emoji" width="80px"/>
      </div>
      <div class="weather-forecast-temp">
        <span class="wf-max">${Math.round(
          forecastDay.temperature.maximum
        )}° / </span>
        <span class="wf-min">${Math.round(
          forecastDay.temperature.minimum
        )}° </span>
      </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let latitude = coordinates.latitude;
  let longitude = coordinates.longitude;
  let apiKey = "030fafcb8ca878fodcb0b3b2t1a5da45";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  let currentcityName = document.querySelector("#cityName");
  let iconElement = document
    .querySelector("#icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);
  celsiusTemp = response.data.temperature.current;
  currentcityName.innerHTML = response.data.city;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.condition.description;

  getForecast(response.data.coordinates);
}
function search(event) {
  event.preventDefault();

  cityElement.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
}

let searchInput = document.querySelector("#search-text-input");
let cityElement = document.querySelector("#cityName");

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let searchButton = document.querySelector("btn-primary");
form.addEventListener("click", search);

function searchCity(city) {
  let apiKey = "030fafcb8ca878fodcb0b3b2t1a5da45";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=030fafcb8ca878fodcb0b3b2t1a5da45&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(coordinates) {
  let latitude = coordinates.coords.latitude;
  let longitude = coordinates.coords.longitude;
  let apiKey = "030fafcb8ca878fodcb0b3b2t1a5da45";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.coords.longitude}&lat=${coordinates.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getcurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getcurrentPosition);

searchCity("Copenhagen");
