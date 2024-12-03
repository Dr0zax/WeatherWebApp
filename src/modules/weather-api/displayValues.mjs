import SevendayForcastTemplate from "./template/7dayforcast.mjs";

export default function sevendayDisplay(data) {
    // Select the main container for daily forecasts
    const main = document.querySelector('.forecast.daily');

    // Debug: Log the data to verify its structure
    console.log(data);

    // Generate the HTML for each day's forecast using map
    const dataseven = data.map(SevendayForcastTemplate);

    // Update the container's innerHTML with the generated content
    main.innerHTML = dataseven.join("");
}