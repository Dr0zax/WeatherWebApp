import createAlertHTML from "./template/alerts.mjs";


export default function displayAlerts(alertsData) {
    const container = document.querySelector(".alerts");

    // Ensure the container exists
    if (!container) {
        console.warn("No .alerts-container element found in the DOM.");
        return;
    }

    // Validate the alerts data format
    if (!alertsData || !Array.isArray(alertsData.features)) {
        console.warn("Invalid alerts data format.");
        container.innerHTML = "<p>No alert data available.</p>";
        return;
    }

    // Check if there are no active alerts
    if (alertsData.features.length === 0) {
        container.innerHTML = `
            <div class="no-alerts">
                <h2>No Active Alerts</h2>
                <p>There are currently no watches, warnings, or advisories for this location.</p>
            </div>
        `;
        return;
    }

    // Map each alert feature to HTML
    const alertsHTML = alertsData.features.map(createAlertHTML).join("");

    // Insert the generated HTML into the DOM
    container.innerHTML = alertsHTML;
}
