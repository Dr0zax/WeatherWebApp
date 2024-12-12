export async function getAlerts(lat, long) {
    const options = {
        method: 'GET',
        headers: {
            "User-agent": "weatherwebapp (youmom@gmail.com)",
            "Accept": "application/json",
        }
    };

    const alertsURL = `https://api.weather.gov/alerts/active?point=${lat},${long}`;

    try {
        const response = await fetch(alertsURL, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch alerts: ${response.status}`);
        }

        const alertsData = await response.json();
        console.log("Alerts Data:", alertsData);

        // The returned object is a FeatureCollection with properties:
        // {
        //   "type": "FeatureCollection",
        //   "features": [ ... array of alerts ... ],
        //   "title": "string",
        //   "updated": "timestamp",
        //   "pagination": { ... }
        // }

        return alertsData; // You can process or filter this data as needed.
    } catch (error) {
        console.error("Error fetching alerts:", error);
    }
}
