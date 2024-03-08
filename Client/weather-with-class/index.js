import { getDataFromURL } from "./modules/dataHandler.js";
import { weatherPrediction } from "./modules/weatherPrediction.js";

const apiKey = "e3c03bc457a2bca1463a28cfbf66b5a4"; // Plaats hier je eigen key...
const form = document.querySelector("form");
const cityInput = document.getElementById("city");
const weatherTableBody = document.querySelector("tbody");

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const cityName = cityInput.value;
    if (cityName) {
        weatherTableBody.innerHTML = "";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
        const weatherData = await getDataFromURL(url);
        weatherData.list.forEach(weatherPredictionData => {
            const weather = new weatherPrediction(weatherPredictionData.dt, weatherPredictionData.main.temp, weatherPredictionData.weather[0].description);
            weather.render(weatherTableBody);
        });
    }
});