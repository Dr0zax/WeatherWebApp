export default async function geocodeLocation(query) {

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`Failed to geocode location: ${response.status}`);
        }

        const data = await response.json();
       console.log(data)
       return data[0]
    } catch (error) {
        console.error("Error geocoding location:", error);
    }
}
