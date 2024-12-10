export default function HourlyForecastTemplate(period) {
    const time = new Date(period.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const temperature = `${period.temperature}°${period.temperatureUnit}`;
    const forecast = period.shortForecast;
    const wind = `${period.windSpeed} ${period.windDirection}`;

    return `
      <div class="hourly-forecast-item">
        <p class="time">${time}</p>
        <p class="condition">${forecast}</p>
        <p class="temp">${temperature}</p>
        <p class="wind">${wind}</p>
      </div>
    `;
}
