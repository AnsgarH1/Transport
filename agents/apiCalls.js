//https://www.rmv.de/hapi/trip?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&numF=2&originWalk=1,0,500&destWalk=1,0,500&originCar=0&destCar=0&originBike=0&destBike=0&originTaxi=0&destTaxi=0"

import { setStationsResults, addTripResult, resetTripResults, setTripResults } from '../redux/actions/apiActions'

import store from '../redux/store'


const apiKey = "2e275638-45cb-4f79-b647-dcbbfb7a76e2"
const stationListBaseUrl = "https://www.rmv.de/hapi/location.name?accessId=" + apiKey + "&format=json"

export const getStationList = async (stationName = null) => {

    if (stationName == null) {
        return false
    }

    //type=s --> s für Station, 
    let url = stationListBaseUrl + "&type=s" + "&input=" + stationName
    try {
        await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                //Here we ripp apart the response and put in a simpler format


                let stationList = []
                response.stopLocationOrCoordLocation.forEach(item => {
                    stationList.push({
                        name: item.StopLocation.name,
                        extId: item.StopLocation.extId,
                        coords: { long: item.StopLocation.lon, lat: item.StopLocation.lat }
                    })
                })
                store.dispatch(setStationsResults(stationList))
                storetemp = store.getState()
                console.log("STATION LIST ADDED")

            })
    } catch (error) {
        console.log("ERROR while Fetching Station List", error)
        return false
    }

    return true


}




export const tripSearch = async () => {


    //first part is just creating the specific url with all parameters for the http request

    const tripBaseUrl = "https://www.rmv.de/hapi/trip?accessId=" + apiKey + "&format=json"

    const origin = store.getState().Trip.Origin
    const destination = store.getState().Trip.Destination

    let originUrlString = ""

    switch (origin.type) {
        case 'COORDS':
            originUrlString = "&originCoordLat=" + origin.coords.lat + "&originCoordLong=" + origin.coords.long
            break
        case 'STATION':
            originUrlString = "&originExtId=" + origin.station.extId
            break
        default:

    }

    let destinationUrlString = ""

    switch (destination.type) {
        case 'COORDS':
            destinationUrlString = "&destCoordLat=" + destination.coords.lat + "&destCoordLong=" + destination.coords.long
            break
        case 'STATION':
            destinationUrlString = "&destExtId=" + destination.station.extId
            break
        default:
    }
    const walkParams = "&destWalk=1,0,500&originWalk=1,0,500" // param1 =  1 -> walking enabled, param2 = 0 -> minimum walking distance = 0m, param3 = 500 maximum walking distance = 500m
    const carParams = "&originCar=0&destCar=0" //disables travel with car. srsly @rmvApi, why would you include travel by car?
    const bikeParams = "&originBike=0&destBike=0" // disables travel with bike
    const taxiParams = "&originTaxi=0&destTaxi=0" // disables travel by taxi. At this point it's just stupid
    const responseTrips = "&numF=2" //declares the amount of trips 

    const polyLine = "&poly=1"

    const url = tripBaseUrl + originUrlString + destinationUrlString + walkParams + carParams + bikeParams + taxiParams + responseTrips + polyLine

    //second part is the actal request
    try {
        await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(response => {

                //lets rip the response apart and put in a usable format
                legs = response.Trip[0].LegList.Leg
                //here we have just the legs without the other stuff, but it still has it skin on and we just want the flesh
                tripLegs = legs.map(item => {
                    /** 
                     *  Each leg consists of a origin, finish, a type (JNY=Journey=public Transport, WALK = Walk (obviously) and the other types are filtered out (car and taxi))
                    *   if the type is Walk, the leg also has a duration and distance
                    *   if the type is Journey, the leg has a name (e.g. "Bus 8") and direction of the vehicle
                    * 
                    *   the origin and destination also have a type, ADR for adress if the origin request were coordinates, and ST for Station
                    */
                    //First let's deal with the origin and destination
                    let legPoint = {
                        type: null,
                        coords: {},
                        station: null
                    }
                    let legOrigin
                    switch (item.Origin.type) {
                        case "ADR":
                            legOrigin = {
                                ...legPoint,
                                originTime: item.Origin.time,
                                originDate: item.Origin.date,
                                type: "COORDS",
                                coords: { long: item.Origin.lon, lat: item.Origin.lat }
                            }
                            break
                        case "ST":
                            legOrigin = {
                                ...legPoint,
                                originTime: item.Origin.time,
                                originDate: item.Origin.date,
                                type: "STATION",
                                station: {
                                    extId: item.Origin.extId,
                                    coords: { long: item.Origin.lon, lat: item.Origin.lat },
                                    name: item.Origin.name
                                }

                            }
                            break
                        //TODO: deal with default
                    }

                    let legDestination
                    switch (item.Destination.type) {
                        case "ADR":
                            legDestination = {
                                ...legPoint,
                                destinationTime: item.Destination.time,
                                destinationDate: item.Destination.date,
                                type: "COORDS",
                                coords: { long: item.Destination.lon, lat: item.Destination.lat }
                            }
                            break
                        case "ST":
                            legDestination = {
                                ...legPoint,
                                destinationTime: item.Destination.time,
                                destinationDate: item.Destination.date,
                                type: "STATION",
                                station: {
                                    extId: item.Destination.extId,
                                    coords: { long: item.Destination.lon, lat: item.Destination.lat },
                                    name: item.Destination.name
                                }
                            }
                            break
                        //TODO: deal with default
                    }

                    // the next part is the creation of the leg item which should be pushed into the legsarray. It again needs to be seperated between type: walking or vehicle
                    let leg
                    switch (item.type) {
                        case "WALK":
                            leg = {
                                id: item.idx,
                                origin: legOrigin,
                                destination: legDestination,
                                type: "WALK",
                                distance: item.dist,
                                duration: item.duration
                            }
                            break
                        case "JNY":
                            leg = {
                                id: item.idx,
                                origin: legOrigin,
                                destination: legDestination,
                                type: "VEHICLE",
                                name: item.name,
                                direction: item.direction,
                                lineDetails: {
                                    line: item.Product.line,
                                    category: item.Product.catCode,
                                    apiReference: item.JourneyDetailRef.ref,
                                },

                                polyLine: item.PolylineGroup.polylineDesc
                            }
                            break
                        default:
                            alert("API kaputt oder Ansgar hat Mist gebaut (apiCalls:165")
                    }
                    return leg
                    //Still in map function
                })
                //Outside of map function


                //I've implemented the possibility to have multiple trips stored in Redux, right now we just want one trip in the store. --> we delete all trips before adding the new one.
                
                store.dispatch(resetTripResults())
                store.dispatch(addTripResult(tripLegs))
                

                console.log("store:",store.getState())

            })
            .catch(error => {
                console.log("ERROR in trip fetching INSIDE of fetch", error)
            })
    } catch (error) {
        console.log("ERROR in trip fetching OUTSIDE of fetch", error)
    }



}
/**
 *  this.props.setStart({ long: this.props.UserData.position.longitude, lat: this.props.UserData.position.latitude })

        const baseURL = "https://www.rmv.de/hapi/trip?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&numF=2&originWalk=1,0,500&destWalk=1,0,500&originCar=0&destCar=0&originBike=0&destBike=0&originTaxi=0&destTaxi=0"

        let startString = ''

        if (this.props.UserData.origin.type == 'STOP_LOCATION') {
            startString = '&originExtId=' + this.props.UserData.start.extId
        } else {
            originString = '&originCoordLat=' + this.props.UserData.start.coords.lat + '&originCoordLong=' + this.props.UserData.start.coords.long
        }

        let destinationString = ''

        if (this.props.UserData.destination.type == 'STOP_LOCATION') {
            destinationString = '&extId=' + this.props.UserData.destination.extId
        } else {
            destinationString = '&destCoordLat=' + this.props.UserData.destination.coords.lat + '&destCoordLong=' + this.props.UserData.destination.coords.long
        }


        const url = baseURL + startString + destinationString
        await fetch(url, { methode: 'GET' })
            .then((response) => response.json())
            .then((response => {
                this.props.updateTripResults(response)
                console.log(this.props.state)
            }))
            .catch(error => console.log('FETCH_ERROR', error))


 */



/**
 *
 *          GEO JSON Feature erstellen:
 *
 * let tripLegsGeoJson = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [

                        ]
                    }
                }
            ]
        }
        this.props.state.ApiResults.TripResults.Trip[0].LegList.Leg.map((item, index) => {
            this.pushCoordinateToLineFeatures(tripLegsGeoJson, { lat: item.Origin.lat, long: item.Origin.lon })
            this.pushCoordinateToLineFeatures(tripLegsGeoJson, { lat: item.Destination.lat, long: item.Destination.lon })
        })
        this.props.setGeoList(tripLegsGeoJson)





    pushCoordinateToLineFeatures = (featureCollection, coords) => {
        featureCollection.features[0].geometry.coordinates.push([coords.long, coords.lat])

        console.log("Hier", featureCollection)

    }
 */