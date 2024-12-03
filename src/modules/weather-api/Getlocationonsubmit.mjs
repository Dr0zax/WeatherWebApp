import geocodeLocation from "./GetLocation.mjs";

export default async function getLocation() {
     const value = document.getElementById('location').value.trim();
     if (!value){
        alert("Please enter location.")
        return
     }
     try{
        let latlong = await geocodeLocation(value)
        console.log(latlong)
        console.log("this is the location")
        return latlong
     } catch (error) {
        console.error("Error geocoding location:", error);
        document.getElementById('output').innerText = "An error occurred while fetching the location.";
    }
}