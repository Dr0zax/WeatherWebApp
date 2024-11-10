import { get3HourForecast } from "./weather-api/get3hourforcast.mjs";

let weather = await get3HourForecast()

const currentWeather = document.querySelector(".current-weather")
const units = document.getElementById("units")
const location = document.getElementById("location")

window.addEventListener("load", () => {
    let savedUnits = localStorage.getItem("units")
    let savedLocation = localStorage.getItem("location")

    if (savedUnits) {
        units.value = savedUnits
    }

    if (savedLocation) {
        location.value = savedLocation
    }
})

units.addEventListener("change", () => {
    localStorage.setItem("units", units.value)
})

// code for changing the gradient behind the current weather section
// it changes the gradient depending on the time of day
// TODO: perhaps pull sunrise and sunset times from the api for use
const setGradient = () => {
    let time = new Date();
    let hours = time.getHours();

    if (hours < 7) {
        currentWeather.style.background = "linear-gradient(0deg, #522722, #4252A3)";
    } else if (hours >= 7 && hours < 18) {
        currentWeather.style.background = "linear-gradient(0deg, rgb(60, 167, 255) 0%, rgb(132, 200, 255) 100%)";
    } else {
        currentWeather.style.background = "linear-gradient(0deg, #522722, #182568)";
    }
}

setGradient();