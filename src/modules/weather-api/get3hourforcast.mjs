// Base URL for NOAA's NWS API
const pointsBaseURL = "https://api.weather.gov/points/";
// NOAA's API does not need a personal API key, but you must set a `User-Agent` header.

// This is the location
let lat = "43.825386";
let long = "-111.792824";
let unit = 'us'

export async function get7DayForecast() {
    const options = {
        method: 'GET',
        headers:{
                "User-agent": "weatherwebapp (youmom@gmail.com)",
                "Accept": "application/ld+json",
            }
        }
        let response = await fetch(`${pointsBaseURL}${lat},${long}}`,options)
        let data = response.json()
        console.log(data)
        
}
