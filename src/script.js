let apiKey = "b6352b3dca0e8a98600ef53301a56b89";
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city-name");
let farenheitLink = document.querySelector("#farenheit");
let celsiusLink = document.querySelector("#celsius");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateDescriptionElement = document.querySelector("#date-description");
let iconElement = document.querySelector("#icon");
let form = document.querySelector("#search-form");

let temperature = 0;

function dispayFarenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (temperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(timestamp) {
  // calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp *1000);
  let day = date.getDay();
  let days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];
  return days[day];
}

function getForcast(coordinates) {
  console.log("COORDINATES", coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayCurrentTemprature(response) {
  temperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.name;
  let currentDate = formatDate(response.data.dt * 1000);
  dateDescriptionElement.innerHTML = `${currentDate} , ${response.data.weather[0].description}`;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForcast(response.data.coord);
}

function currentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentTemprature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  cityInput = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentTemprature);
}

function displayForcast(response) {
  let forcast = response.data.daily;
  console.log(forcast)
  let forcastElement = document.querySelector("#forcast");
  
  forcastHTML = ``
  forcast.forEach(function(forcastDay, index){
    if (index<6) {
    forcastHTML += `
    <div class="col-2">
      <span class="weather-forcast-date">${formatDay(forcastDay.dt)}</span>
      <br/>
      <img src="http://openweathermap.org/img/wn/${forcastDay.weather[0].icon}@2x.png" alt="" width="65" />
      <br/>
      <span class="weather-forcast-temp-max">${Math.round(forcastDay.temp.max)}°</span> <span class="weather-forcast-temp-min">${Math.round(forcastDay.temp.min)}°</span>
    </div>
    `;
    }
  });
  forcastElement.innerHTML = forcastHTML;
}


farenheitLink.addEventListener("click", dispayFarenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusTemperature);
form.addEventListener("submit", handleSubmit);

navigator.geolocation.getCurrentPosition(currentCity);
