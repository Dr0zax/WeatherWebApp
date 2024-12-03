export default function displayNext3HoursForecast(forecastData) {
    // Check if forecastData.list has at least one item
    if (forecastData.list && forecastData.list.length > 0) {
        // Limit to the first 4 intervals (next 12 hours)
        const limitedForecast = forecastData.list.slice(0, 4);

        // Generate HTML for each forecast interval
        const forecastHTML = limitedForecast.map(entry => {
            // Convert UTC timestamp to local time
            const localTime = new Date(entry.dt * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            });

            const condition = entry.weather[0].description;
            const temperature = (entry.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius

            return `
                <div class="forecast-item">
                    <p class="time">${localTime}</p>
                    <p class="condition">${condition}</p>
                    <p class="temp">${temperature}°C</p>
                </div>
            `;
        }).join(''); // Join array to form one HTML string

        // Insert the forecast HTML into the container
        document.querySelector('#forecast-container').innerHTML = forecastHTML;
    } else {
        console.error("No forecast data available");
    }
}
