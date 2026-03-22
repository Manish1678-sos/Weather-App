const tempField = document.querySelector(".temperature p");
const locationField = document.querySelector(".place p");
const timeField = document.querySelector(".time p");
const conditionField = document.querySelector(".condition p");

const form = document.querySelector("#Weather-form");
const searchField = document.querySelector("#city");

// 1. FIXED: Define a default starting location so the script doesn't break
let targetLocation = "Kolkata"; 


form.addEventListener("submit", function (e) {
  e.preventDefault();
  targetLocation = searchField.value;
  fetchWeather(targetLocation);
});


async function fetchWeather(city) {
  try {
   
    let url = `https://api.weatherapi.com/v1/current.json?key=c5478d57f8a84bdd99d173824262103&q=${city}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert("City not found!");
      return;
    }


    updateUI(data);

  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}


function updateUI(data) {

  tempField.innerText = data.current.temp_c + "°C";
  locationField.innerText = data.location.name;
  
  
  timeField.innerText = data.location.localtime; 
  conditionField.innerText = data.current.condition.text; 
}

// default load
fetchWeather(targetLocation);