import {} from '../../redux/actions'
import store from '../../redux/store'

export default searchStationByCoords = (long, lat) =>{
    let baseUrlString = 'https://www.rmv.de/hapi/location.nearbystops?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&type=S&originCoordLat=' + lat + '&originCoordLong=' + long;
    
    
const baseGeoJSON = {
    "type": "FeatureCollection",
    "features": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            8.243,
            50.07
          ]
        }
      }
}


    fetch(urlString, { method: 'GET' })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)

            console.log(store.getState())
        })
        .catch((error) => {
            console.log("FETCH ERROR---------------")
            console.log(error)
        });
}