const pointsBaseURL = "https://api.weather.gov/points/";
// Location coordinates

// This function gets the weather data from the NWS API
export async function getForecast(lat, long) {
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

        // Extract the forecast URL from the grid point response
        const forecastURL = data.properties.forecast;

        // Step 2: Fetch the forecast data using the forecast URL
        response = await fetch(forecastURL + `?units=${unitValue}`, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch forecast data: ${response.status}`);
        }

        let forecastData = await response.json();

        // Log the forecast data
        console.log(forecastData);

        // Process the forecast data (example: log temperature and short description)


        return forecastData.properties.periods;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
