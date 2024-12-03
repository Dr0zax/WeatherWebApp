
// this is the URL for the api request
const baseURL = "https://api.openweathermap.org/data/2.5/forecast?"
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
        method: "GET",
        headers: {
            "appid": apikey
        }

        };
        // tries to get the jason object
        try{
            const response = await fetch(`${baseURL}lat=${lat}&lon=${long}&appid=${apikey}&units=standard`);

            // give and error if the object is not status code 200
            if(!response.ok){
                throw new Error("Failed to Get Weather Forecast")
        }
        // creates the javascript object
        let threehourforcast = await response.json();
        // use this to see the response object in the console 
        console.log(threehourforcast);
        //retuns the javascript object to be stored.
        return threehourforcast

        }
        //catches any erro that is made in the api request or retrieving 
        catch(error) {
            console.log(error)
            return[]
        }  
    
    }   