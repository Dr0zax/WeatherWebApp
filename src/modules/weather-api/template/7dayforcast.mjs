
export default function SevendayForcastTemplate(data) {
    return ` <div>
        <p class="day">${data.name}</p>
        <p class="condition">${data.shortForecast}</p>
            <p class="temp">${data.temperature}°</p>
     </div>
    `
}