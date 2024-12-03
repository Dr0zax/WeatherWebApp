export default function display7DayForecast(forecastData) {
    // Check if forecastData.properties.periods has at least one item
    if (forecastData.properties && forecastData.properties.periods && forecastData.properties.periods.length > 0) {
        // Limit to 7 periods (7 days)
        const limitedForecast = forecastData.properties.periods.slice(0, 7);

        // Generate HTML for each forecast day
        const forecastHTML = limitedForecast.map(entry => {
            // Use the name property (e.g., "Monday", "Tonight") for the time period
            const periodName = entry.name;

            const condition = entry.shortForecast; // Short description of the weather
            const temperature = `${entry.temperature}°${entry.temperatureUnit}`; // Temperature with unit (e.g., "75°F")

            return `
                <div class="forecast-item">
                    <p class="day">${periodName}</p>
                    <p class="condition">${condition}</p>
                    <p class="temp">${temperature}</p>
                </div>
            `;
        }).join(''); // Join array to form one HTML string

        // Insert the forecast HTML into the container
        document.querySelector('#forecast-container').innerHTML = forecastHTML;
    } else {
        console.error("No forecast data available");
    }
}
