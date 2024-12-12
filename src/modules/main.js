import displayAlerts from "./weather-api/displayalerts.mjs";
import displayHourlyForecast from "./weather-api/displayhourlyvalues.mjs";
import sevendayDisplay from "./weather-api/displayValues.mjs";
import { getForecast } from "./weather-api/get3hourforcast.mjs";
import { getAlerts } from "./weather-api/getAlerts.mjs";
import getLocation from "./weather-api/Getlocationonsubmit.mjs";
import { getHourlyForecast } from "./weather-api/hourlyforcast.mjs";

const units = document.getElementById("units");
const locationInputField = document.getElementById("location");

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
});

async function fetchAndDisplayWeather(lat, long) {
    try {
        const weather = await getForecast(lat, long);
        const hourly = await getHourlyForecast(lat, long);
        const alerts = await getAlerts(lat, long);

        console.log('Weather Data:', weather);
        console.log('Hourly:', hourly);
        console.log('Alerts:', alerts);

        sevendayDisplay(weather);
        displayHourlyForecast(hourly);
        displayAlerts(alerts);
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

getdata();
