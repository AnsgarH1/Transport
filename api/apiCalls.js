//https://www.rmv.de/hapi/trip?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&numF=2&originWalk=1,0,500&destWalk=1,0,500&originCar=0&destCar=0&originBike=0&destBike=0&originTaxi=0&destTaxi=0"

import { setStationsResults } from '../redux/actions/apiActions'

import store from '../redux/store'


const apiKey = "2e275638-45cb-4f79-b647-dcbbfb7a76e2"
const tripBaseUrl = "https://www.rmv.de/hapi/trip?accessId=" + apiKey + "&format=json"
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
        console.log("TRYCATCH ERROR!!! : ", error)
        return false
    }

    return true


}

/**
 *
 * getStationResults = async (stationName = '') => {
        apiUrl = 'https://www.rmv.de/hapi/location.name?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&type=S&input=' + stationName;

        await fetch(apiUrl, { method: 'GET' })
            .then((response) => response.json())
            .then((response) => {
                this.props.setStationResults(response)
                console.log(this.props.state)
            })
            .catch((error) => {
                console.log(error)
            });

        this.createListItems()

    }
 */