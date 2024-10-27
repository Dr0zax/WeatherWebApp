const baseURL = "https://api.openweathermap.org/data/2.5/forecast?"
let lat = "43.825386"
let long = "-111.792824"
let units = ""
const apikey = import.meta.env.VITE_WEATHER_API_KEY;

console.log("api key below!")
console.log(apikey)
export async function get3HourForecast(){
    const options = {
        method: "GET",
        headers: {
            "appid": apikey
        }

        };

        try{
            const response = await fetch(`${baseURL}lat=${lat}&lon=${long}&appid=${apikey}&units=standard`);


            if(!response.ok){
                throw new Error("Failed to Get Weather Forecast")
        }

        let threehourforcast = await response.json();
        console.log(threehourforcast);
        return threehourforcast

        }
        catch(error) {
            console.log(error)
            return[]
        }  
    
    }   