
let weekDays = [
  "Sunday",
  "Monday",
  "Thuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let celsius = document.querySelector("#celsius");
let temp = document.querySelector("#temp");
let farenheit = document.querySelector("#farenheit");
let cityName = document.querySelector("#city-name");
let apiKey = "b6352b3dca0e8a98600ef53301a56b89";
let searchForm = document.querySelector("form.search");
let currentCityBtn = document.querySelector('.current');



function displayCurrentDate() {
  let currentDate = document.querySelector("h2.current-date");
  let now = new Date();
  currentDate.innerHTML = `${
    weekDays[now.getDay()]
  } ${now.getHours()}:${now.getMinutes()}`;
}
displayCurrentDate();

function showSearchTemprature(response) {
  let temprature = Math.round(response.data.main.temp);
  temp.innerHTML = temprature;
  cityName.innerHTML = response.data.name;
  celsius.addEventListener("click", function () {
    temp.innerHTML = temprature;
  });
  farenheit.addEventListener("click", function () {
    temp.innerHTML = Math.round(temprature * 1.8 + 32);
  });
}


function searchCityName() {
  searchForm.addEventListener("submit", function(event) {
      event.preventDefault();
      cityName.innerHTML = document.querySelector("#input").value;
      let searchCityName = document.querySelector("#input").value;


      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityName}&units=metric&appid=${apiKey}`;
      axios.get(url).then(showSearchTemprature);
  });
}
searchCityName()


function showCurrentTemprature(response) {
  console.log("response",response);
  let temprature = Math.round(response.data.main.temp);
  temp.innerHTML = temprature;
  cityName.innerHTML = response.data.name;
  celsius.addEventListener("click", function () {
    temp.innerHTML = temprature;
  });
  farenheit.addEventListener("click", function () {
    temp.innerHTML = Math.round(temprature * 1.8 + 32);
  });  
}


function currentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log("latitude",latitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemprature);
}
navigator.geolocation.getCurrentPosition(currentCity);


currentCityBtn.addEventListener('click', () =>{
  navigator.geolocation.getCurrentPosition(currentCity);
});

