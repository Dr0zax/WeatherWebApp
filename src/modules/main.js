import { get3HourForecast } from "./weather-api/get3hourforcast.mjs";

// let weather = await get3HourForecast()

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
// TODO: perhaps pull sunrise and sunset times from the api and find proper colors
const setGradient = () => {
    let time = new Date();
    let hours = time.getHours();
    
    if (hours < 7 && hours >= 5) {
        //Sunrise
        currentWeather.style.background = "linear-gradient(0deg, rgb(218, 136, 136), rgb(45, 129, 199))";
    } else if (hours >= 7 && hours < 18) {
        //Day
        currentWeather.style.background = "linear-gradient(0deg, rgb(60, 167, 255), rgb(132, 200, 255))";
    } else if (hours >= 18 && hours < 19) {
        //Sunset
        currentWeather.style.background = "linear-gradient(0deg, rgb(105, 65, 65), rgb(66, 82, 163))";
    } else {
        //Night
        currentWeather.style.background = "linear-gradient(0deg, rgb(24, 37, 104), rgb(0, 0, 0))";
    }
        
}

setGradient();