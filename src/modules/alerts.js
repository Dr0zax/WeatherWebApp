import displayAlerts from "./weather-api/displayalerts.mjs";
import { getAlerts } from "./weather-api/getAlerts.mjs";
import getLocation from "./weather-api/Getlocationonsubmit.mjs";

const units = document.getElementById("units");
const locationInputField = document.getElementById("location");

// On page load, try to restore units and location input
window.addEventListener("load", () => {
    const savedUnits = localStorage.getItem("units");
    const savedLocation = localStorage.getItem("location");

    if (savedUnits != null) {
        units.checked = savedUnits === "true";
    }

    // Check URL params first
    const params = new URLSearchParams(window.location.search);
    const urlLocation = params.get("location");

    // If there's a location in the URL, use that; otherwise fallback to localStorage
    if (urlLocation) {
        locationInputField.value = urlLocation;
    } else if (savedLocation != null) {
        locationInputField.value = savedLocation;
    }

    // Attempt to auto-fetch alerts if lat/long available in URL or localStorage
    autoFetchAlerts();
});

units.addEventListener("change", () => {
    localStorage.setItem("units", units.checked);
});

async function autoFetchAlerts() {
    const params = new URLSearchParams(window.location.search);
    let lat = parseFloat(params.get("lat"));
    let long = parseFloat(params.get("long"));

    const hasValidURLCoords = !isNaN(lat) && !isNaN(long);

    if (!hasValidURLCoords) {
        // Attempt to use localStorage if URL not present or invalid
        const storedLat = parseFloat(localStorage.getItem("lat"));
        const storedLong = parseFloat(localStorage.getItem("long"));
        if (!isNaN(storedLat) && !isNaN(storedLong)) {
            lat = storedLat;
            long = storedLong;
        }
    }

    const hasValidCoords = !isNaN(lat) && !isNaN(long);
    if (hasValidCoords) {
        // Fetch alerts with these coordinates
        fetchAndDisplayAlerts(lat, long);
    } else {
        console.log("No valid coordinates found in URL or localStorage. User must enter a location.");
    }
}

async function fetchAndDisplayAlerts(lat, long) {
    try {
        const alerts = await getAlerts(lat, long);
        console.log("alerts", alerts);
        displayAlerts(alerts);
    } catch (error) {
        console.error('Error fetching alerts:', error);
    }
}

function updateURLParams(lat, long, locationName) {
    const url = new URL(window.location.href);
    url.searchParams.set("lat", lat);
    url.searchParams.set("long", long);
    if (locationName) {
        url.searchParams.set("location", locationName);
    }
    // Push state so the URL updates without reloading the page
    window.history.pushState({}, '', url.toString());
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

                    // Update URL parameters with the new coords and location name
                    updateURLParams(latitude, longitude, locationInput);

                    // Fetch and display alerts
                    fetchAndDisplayAlerts(latitude, longitude);
                } else {
                    console.error("Invalid latitude/longitude from location service.");
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
