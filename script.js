// In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
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

function search(event) {
  event.preventDefault();
  cityElement.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}
let searchInput = document.querySelector("#search-text-input");
let cityElement = document.querySelector("#cityName");

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemp(response) {
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentcityName = document.querySelector("#cityName");
  currentcityName.innerHTML = response.data.name;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "8543f1a82410676e3d23debd07622840";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);

// BonusFeature

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "8543f1a82410676e3d23debd07622840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function getcurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getcurrentPosition);
searchCity("Copenhagen");
