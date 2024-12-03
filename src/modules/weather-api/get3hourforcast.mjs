

const pointsBaseURL = "https://api.weather.gov/points/";
// this is the location
let lat = "43.825386"
let long = "-111.792824"
//TODO Add the location getter for open street maps 
let units = ""
// Gets the api Key
const apikey = import.meta.env.VITE_WEATHER_API_KEY;

// Uncomment this to see the api Key or if you have issues with the api key
// console.log("api key below!")
// console.log(apikey)

// this function get the weather data from openweathermap api
export async function get3HourForecast(){

    // set the header request
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
