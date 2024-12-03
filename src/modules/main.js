import sevendayDisplay from "./weather-api/displayValues.mjs";
import {getForecast } from "./weather-api/get3hourforcast.mjs";


// let weather = await get3HourForecast()

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

async function getdata(){
let weather = await getForecast();
sevendayDisplay(weather)
}
getdata()