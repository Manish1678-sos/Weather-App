const tempField = document.querySelector(".temperature p");
const locationField = document.querySelector(".place p");
const timeField = document.querySelector(".time p");
const conditionField = document.querySelector(".condition p");

const form = document.querySelector("#Weather-form");
const searchField = document.querySelector("#city");

let targetLocation = "Kolkata";


function showLoading() {
  tempField.innerText = "Loading...";
  conditionField.innerText = "";
  locationField.innerText = "";
  timeField.innerText = "";
}


function showError(msg) {
  tempField.innerText = "Error!";
  conditionField.innerText = msg;
  locationField.innerText = "";
  timeField.innerText = "";
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = searchField.value.trim();

  if (!city) {
    alert("Enter city name");
    return;
  }

  fetchWeather(city);
  searchField.value = "";
});


async function fetchWeather(city) {
  showLoading();

  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=c5478d57f8a84bdd99d173824262103&q=${city}&aqi=no`

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();
    console.log(data);

    if (data.error) {
      showError("City not found");
      return;
    }

    updateUI(data);

  } catch (err) {
    console.error(err);
    showError("Failed to fetch data");
  }

}


function updateUI(data) {
  tempField.innerText = `${data.current.temp_c}°C`;
  conditionField.innerText = data.current.condition.text;
  locationField.innerText = `${data.location.name}, ${data.location.country}`;
  timeField.innerText = data.location.localtime;
}


fetchWeather(targetLocation);