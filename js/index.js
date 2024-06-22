// weather api
let key = "37436105387e4b1ba31115517241106";
let Base_URL = "http://api.weatherapi.com/v1";
let url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=London&&days=3`;
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const directions = [
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
  "west",
  "northwest",
];
//console.log(url);
async function search(obj) {
  //fetch date
  let location_weather = await fetch(
    `${Base_URL}/forecast.json?key=${key}&q=${obj}&days=3`
  );
  //console.log(location_weather);
  //cheak validate of the data & 400 is url erorr
  if (location_weather.ok && 400 != location_weather.status) {
    let a = await location_weather.json();
    //display current day weather
    displayCurrent(a.location, a.current);
    //display next two day weather
    displayAnother(a.forecast.forecastday);
    //console.log(a);
  }
}
//
document.getElementById("search").addEventListener("keyup", (a) => {
  search(a.target.value);
  //console.log(a.target.value);
});
// function get degree and return name of wind directions
function getdirection(degrees) {
  // Split into the 8 directions
  degrees = (degrees * 8) / 360;
  // round to nearest integer.
  degrees = Math.round(degrees, 0);
  // Ensure it's within 0-7
  degrees = (degrees + 8) % 8;
  return directions[degrees];
  //console.log();
}
// display current day function
function displayCurrent(location, current_day) {
  const d = new Date(current_day.last_updated);
  //console.log(d);
  let num_day = current_day.last_updated[8] + current_day.last_updated[9];
  //console.log(num_day);
  let day = weekday[d.getDay()];
  let month = monthNames[d.getMonth()];
  //console.log("day", day);
  //console.log("month", month);
  //console.log(location.name);
  let degrees = getdirection(current_day.wind_degree);
  //console.log(degrees);
  let current = `
          <div class="today forecast">
              <div class="forecast-header d-flex justify-content-between" id="today">
                <div class="day">${day}</div>
                <div class="date">${num_day + month}</div>
              </div>
              <!-- .forecast-header -->
              <div class="forecast-content" id="current">
                <div class="location">${location.name}</div>
                <div class="degree">
                  <div class="num">${current_day.temp_c}<sup>o</sup>C</div>
                  <div class="forecast-icon">
                    <img
                      src="https:${current_day.condition.icon}"
                      alt=""
                    />
                  </div>
                </div>
                <div class="custom">${current_day.condition.text}</div>
                <span
                  ><img src="./images/icon-umberella@2x.png" alt="" />${
                    current_day.cloud
                  }%</span
                >
                <span
                  ><img src="./images/icon-wind@2x.png" alt="" />${
                    current_day.wind_kph
                  }km/h</span
                >
                <span
                  ><img src="./images/icon-compass@2x.png" alt="" />${degrees}</span
                >
              </div>
            </div>
  `;
  document.getElementById("forecast").innerHTML = current;
}
// display next two day weather function
function displayAnother(another_day) {
  let cartona = "";
  for (let i = 1; i < 3; i++) {
    cartona += `
    <div class="forecast">
              <div class="forecast-header">
                <div class="day">${
                  weekday[new Date(another_day[i].date).getDay()]
                }</div>
              </div>
              <div class="forecast-content">
                <div class="forecast-icon">
                  <img
                    src="https:${another_day[i].day.condition.icon}"
                    alt=""
                    width="48"
                  />
                </div>
                <div class="degree">${
                  another_day[i].day.maxtemp_c
                }<sup>o</sup>C</div>
                <small>${another_day[i].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${another_day[i].day.condition.text}</div>
              </div>
            </div>
    `;
  }
  document.getElementById("forecast").innerHTML += cartona;
}
//defult page preview
search("cairo");
