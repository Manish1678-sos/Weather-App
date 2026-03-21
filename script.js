const tempField = document.querySelector(".temperature p");
const locationField = document.querySelector(".place p");
const timeField = document.querySelector(".time p");
const conditionField = document.querySelector(".condition p");

const form = document.querySelector("#Weather-form");
const searchField = document.querySelector("#city");

let targetLocation = "Kolkata";

// form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  targetLocation = searchField.value;
  fetchWeather(targetLocation);
});

// fetch weather
async function fetchWeather(city) {
  try {
  let url = `https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=Kolkata&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    if (data.error) {
      alert("City not found!");
      return;
    }

    updateUI(data);

  } catch (error) {
    console.log(error);
  }
}

// update UI
function updateUI(data) {
  tempField.innerText = data.current.temp_c + "°C";
  locationField.innerText = data.location.name;
  timeField.innerText = data.location.localtime;
  conditionField.innerText = data.current.condition.text;
}

// default load
fetchWeather(targetLocation);