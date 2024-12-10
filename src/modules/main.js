
import sevendayDisplay from "./weather-api/displayValues.mjs";
import {getForecast } from "./weather-api/get3hourforcast.mjs";
import getLocation from "./weather-api/Getlocationonsubmit.mjs";

// let weather = await get3HourForecast()

const units = document.getElementById("units")
const location = document.getElementById("location")

window.addEventListener("load", () => {
    let savedUnits = localStorage.getItem("units")
    let savedLocation = localStorage.getItem("location")

    if (savedUnits != null) {
        units.checked = savedUnits
    }

    if (savedLocation != null) {
        location.value = savedLocation
    }
})

units.addEventListener("change", () => {
    localStorage.setItem("units", units.checked)
})

async function getdata(){
    // Target the form
const form = document.querySelector('.search-form');

// Ensure the form exists
if (form) {
    // Add a submit event listener
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission and page reload

        // Get the value of the location input field
        const locationInput = document.getElementById('location').value.trim();

        if (locationInput) {
            console.log(`Searching for weather in: ${locationInput}`);
            
            // Call your functions here, e.g., getLocation or getForecast
            try {
                const locationData = await getLocation(locationInput); // Ensure getLocation is defined and works
                console.log('Location Data:', locationData);
                const latitude = parseFloat(locationData.lat);
                const longitude = parseFloat(locationData.lon);


                const weather = await getForecast(latitude, longitude); // Ensure getForecast is defined
                console.log('Weather Data:', weather);

                sevendayDisplay(weather); // Ensure sevendayDisplay is defined
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        } else {
            alert('Please enter a location.');
        }
    });
} else {
    console.error('Form with class "search-form" not found.');
}



}
getdata()