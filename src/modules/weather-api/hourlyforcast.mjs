const pointsBaseURL = "https://api.weather.gov/points/";
// Location coordinates

// This function gets the hourly weather data from the NWS API
export async function getHourlyForecast(lat, long) {
    const units = document.getElementById("units");
    const unitValue = units.checked ? "si" : "us";
    try {
        // Set the header for the API request
        const options = {
            method: 'GET',
            headers: {
                "User-agent": "weatherwebapp (youmom@gmail.com)",
                "Accept": "application/json",
            }
        };

        // Step 1: Get the grid point data for the given coordinates
        let response = await fetch(`${pointsBaseURL}${lat},${long}`, options);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Failed to fetch grid points: ${response.status}`);
        }

        let data = await response.json();

        // Extract the hourly forecast URL from the grid point response
        const hourlyForecastURL = data.properties.forecastHourly;

        // Step 2: Fetch the hourly forecast data using the hourly forecast URL
        response = await fetch(`${hourlyForecastURL}?units=${unitValue}`, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch hourly forecast data: ${response.status}`);
        }

        let forecastData = await response.json();

        // Log the forecast data for debugging
        console.log("Hourly Forecast Data:", forecastData);
        console.log("Points Data:", data);
        console.log("Hourly Forecast URL:", hourlyForecastURL);
        console.log("Forecast Data:", forecastData);

        // Return the hourly forecast periods
        return forecastData;
    } catch (error) {
        console.error("Error fetching hourly weather data:", error);
    }
}
