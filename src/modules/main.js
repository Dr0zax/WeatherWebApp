import displayAlerts from "./weather-api/displayalerts.mjs";
import displayHourlyForecast from "./weather-api/displayhourlyvalues.mjs";
import sevendayDisplay from "./weather-api/displayValues.mjs";
import { getForecast } from "./weather-api/get3hourforcast.mjs";
import { getAlerts } from "./weather-api/getAlerts.mjs";
import getLocation from "./weather-api/Getlocationonsubmit.mjs";
import { getHourlyForecast } from "./weather-api/hourlyforcast.mjs";

const units = document.getElementById("units");
const locationInputField = document.getElementById("location");

const hero = document.querySelector(".current-weather");
const heroLocation = document.querySelector(".location");
const heroTemp = document.querySelector(".temperature");
const heroTempRangeHigh = document.querySelector("#high");
const heroTempRangeLow = document.querySelector("#low");

const dropdownElement = document.querySelectorAll(".dropdown");

dropdownElement.forEach(element => {
    element.addEventListener("click", (e) => {
        if (e.target.tagName != "BUTTON") {
            e.target = e.target.closest("button");
            e.target.parentElement.querySelector(".dropdown-content").classList.toggle("active");
        }
    })
    
});

window.addEventListener("load", () => {
    let savedUnits = localStorage.getItem("units");
    let savedLocation = localStorage.getItem("location");
    let savedLat = parseFloat(localStorage.getItem("lat"));
    let savedLong = parseFloat(localStorage.getItem("long"));

    if (savedUnits != null) {
        units.checked = savedUnits === "true";
    }

    if (savedLocation != null) {
        locationInputField.value = savedLocation;
    }

    // If we have valid coordinates in localStorage, fetch and display data automatically
    if (!isNaN(savedLat) && !isNaN(savedLong)) {
        console.log("Using stored coordinates:", savedLat, savedLong);
        fetchAndDisplayWeather(savedLat, savedLong);
    }
});

units.addEventListener("change", () => {
    localStorage.setItem("units", units.checked);
    fetchAndDisplayWeather(parseFloat(localStorage.getItem("lat")), parseFloat(localStorage.getItem("long")));
});

async function fetchAndDisplayWeather(lat, long) {
    try {
        const weather = await getForecast(lat, long);
        const hourly = await getHourlyForecast(lat, long);
        const alerts = await getAlerts(lat, long);
        const location = await getLocation(lat, long);
        const lowAndHigh = getHighAndLow(hourly);

        console.log('Weather Data:', weather);
        console.log('Hourly:', hourly);
        console.log('Alerts:', alerts);
        console.log('Location:', location);
        console.log('Low and High:', lowAndHigh);

        sevendayDisplay(weather);
        displayHourlyForecast(hourly);
        displayAlerts(alerts);

        heroLocation.innerHTML = location.name;
        heroTemp.innerHTML = `${hourly.properties.periods[0].temperature}°${units.checked ? "C" : "F"}`;
        heroTempRangeLow.innerHTML = lowAndHigh[0];
        heroTempRangeHigh.innerHTML = lowAndHigh[1];
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function getdata() {
    const form = document.querySelector('.search-form');

    if (!form) {
        console.error('Form with class "search-form" not found.');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const locationInput = locationInputField.value.trim();

        if (locationInput) {
            console.log(`Searching for weather in: ${locationInput}`);
            try {
                const locationData = await getLocation(locationInput);
                console.log('Location Data:', locationData);
                const latitude = parseFloat(locationData.lat);
                const longitude = parseFloat(locationData.lon);

                if (!isNaN(latitude) && !isNaN(longitude)) {
                    // Store location and coordinates in localStorage
                    localStorage.setItem("location", locationInput);
                    localStorage.setItem("lat", latitude);
                    localStorage.setItem("long", longitude);

                    // Fetch and display weather using the newly obtained coordinates
                    fetchAndDisplayWeather(latitude, longitude);
                } else {
                    console.error("Invalid coordinates from location service.");
                    alert("Unable to determine coordinates. Please try another location.");
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
                alert('Unable to fetch location data. Please try again.');
            }
        } else {
            alert('Please enter a location.');
        }
    });
}

function getHighAndLow(data) {
    let high = 0;
    let low = 999;

    let firstTwelvePeriods = data.properties.periods.slice(0, 12);
    
    firstTwelvePeriods.forEach(element => {
        high = Math.max(element.temperature, high);
        low = Math.min(element.temperature, low);
    });

    return [low, high]
}

getdata();