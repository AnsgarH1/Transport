import React, { Component } from 'react'

import { connect } from 'react-redux'

import SearchStationComponentPresentational from '../presentational/SearchStationComponentPresentational';
import { ListItem } from 'react-native-elements';
import { activateMapFlyTo } from '../../redux/actions/uxActions';
import { addMarker, setMarkers, setRoute } from '../../redux/actions/mapActions';
import { setDestinationStation, setStartCoords, setPosition, setDestinationCoords, setStartStation } from '../../redux/actions/userdataActions';
import { setStationsResults, setTripResults } from '../../redux/actions/apiActions';

import { getStationList } from '../../api/apiCalls'

class SearchStationContainer extends Component {
    state = {
        TextInput: '',

    }

    onChangeTextHandler = (text) => {
        this.setState({
            TextInput: text
        })
        this.getStationResults(text)
    }
    onDeleteHandler = () => {
        this.setState({
            TextInput: null,
            listItems: null
        })
    }

    getDepartures = async (stationExtId) => {

        apiUrl = 'https://www.rmv.de/hapi/departureBoard?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&type=S&extId=' + stationExtId

        await fetch(apiUrl, { method: 'GET' })
            .then((response) => response.json())
            .then((response) => { this.props.updateDepartureResults(response) })
            .catch(error => console.log("Error while fetching departure Results: ", error))
    }


    getStationResults = async (stationName = '') => {

        if (getStationList(stationName)) {
            await this.createListItems()
        } else {
            console.log("Error while fetching Station!!")
        }





    }


    createListItems = () => {

        /**
         * Aus irgendeinem Grund werden die Sucherergbnisse  als anzahl an Objekten gespeichert, weshalb die mit Object.values 
         * erst wieder in einen Array umgewandelt werden müssen. (wtf?)
         */
        let temp = Object.values(this.props.SearchResults)
        if (this.state.TextInput.length > 0 && this.props.SearchResults != {} && this.props.SearchResults != null) {
            let listItems = []
            temp.forEach((item, index) => {
                listItems.push(<ListItem onPress={() => { this.onItemSelection(item) }} key={'id_' + index} containerStyle={{ margin: 1 }} title={item.name} />)
            })
            this.setState({ listItems })
        } else {
            this.setState({ listItems: null })
        }
    }

    onItemSelection = item => {
        this.setState({ TextInput: item.name })


        const coords = {
            long: item.coords.long,
            lat: item.coords.lat
        }

        let stop = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": { icon: 'marker-15' },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            item.coords.long,
                            item.coords.lat
                        ]
                    }
                }
            ]
        }
        this.props.setMarker(stop)
        this.props.mapFlyTo(coords)
        this.props.setDestinationStation(item.extId)
        this.props.setStartCoords({ long: this.props.UserData.position.longitude, lat: this.props.UserData.position.latitude })
        this.tripSearch()

    }

    tripSearch = async () => {



        const baseURL = "https://www.rmv.de/hapi/trip?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&numF=2&originWalk=1,0,500&destWalk=1,0,500&originCar=0&destCar=0&originBike=0&destBike=0&originTaxi=0&destTaxi=0"

        let startString = ''

        if (this.props.UserData.start.type == 'STOP_LOCATION') {
            startString = '&originExtId=' + this.props.UserData.start.extId
        } else {
            startString = '&originCoordLat=' + this.props.UserData.start.coords.lat + '&originCoordLong=' + this.props.UserData.start.coords.long
        }

        let destinationString = ''

        if (this.props.UserData.destination.type == 'STOP_LOCATION') {
            destinationString = '&destExtId=' + this.props.UserData.destination.extId
        } else {
            destinationString = '&destCoordLat=' + this.props.UserData.destination.coords.lat + '&destCoordLong=' + this.props.UserData.destination.coords.long
        }

        const url = baseURL + startString + destinationString

        console.log(url)
        await fetch(url, { methode: 'GET' })
            .then((response) => response.json())
            .then((response => {
                this.props.updateTripResults(response)
            }))
            .catch(error => console.log('FETCH_ERROR', error))

        let tripLegsGeoJson = {
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




    }


    pushCoordinateToLineFeatures = (featureCollection, coords) => {
        featureCollection.features[0].geometry.coordinates.push([coords.long, coords.lat])


    }



    render() {
        return (
            <SearchStationComponentPresentational
                TextInput={this.state.TextInput}
                onChangeTextHandlerFunction={this.onChangeTextHandler}
                onDeleteFunction={this.onDeleteHandler}
                inputPlaceholder='Wiesbaden Hauptbahnhof'
                SearchResults={this.state.listItems != null ? this.state.listItems : null}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    SearchResults: state.ApiResults.StationSearchResults,
    state: state,
    mapFlyTo: state.UX.mapFlyTo,
    UserData: state.UserData
})


const mapDispatchToProps = dispatch => ({
    setStationResults: results => dispatch(setStationsResults(results)),
    setDestinationStation: extId => dispatch(setDestinationStation(extId)),
    mapFlyTo: coords => dispatch(activateMapFlyTo(coords)),
    setMarker: marker => dispatch(addMarker(marker)),
    updatePosition: (coords) => dispatch(setPosition(coords)),

    setCoordDestination: coords => dispatch(setDestinationCoords(coords)),
    setStartCoords: startCoords => dispatch(setStartCoords(startCoords)),

    updateTripResults: (tripResults) => dispatch(setTripResults(tripResults)),

    setGeoFeature: featureList => dispatch(setMarkers(featureList)),
    setGeoList: geoList => dispatch(setRoute(geoList))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchStationContainer)
