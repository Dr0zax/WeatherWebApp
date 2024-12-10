import HourlyForecastTemplate from "./template/hourlytemplate.mjs";

export default function displayHourlyForecast(data) {
    // Extract the periods array from the forecast data
    const periods = data.properties.periods;

    // Take the first 12 forecast periods
    const firstTwelvePeriods = periods.slice(0, 12);

    // Generate HTML for the first 12 hours using the HourlyForecastTemplate
    const hourlyHTML = firstTwelvePeriods.map(HourlyForecastTemplate).join("");

    // Insert the generated HTML into the DOM
    const container = document.querySelector(".forecast.hourly");
    container.innerHTML = hourlyHTML;
}
