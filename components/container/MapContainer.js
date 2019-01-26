import React, { Component } from 'react'
import { View, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'

import MapComponentPresentational from '../presentational/MapComponentPresentational'

import { deactivateMapFlyTo } from '../../redux/actions/uxActions'
import { setPosition, selectDestination, setStartCoords, setDestinationStation, setDestinationCoords } from '../../redux/actions/userdataActions';


import { LocationPermissionText } from '../../styles/texts'
import { setTripResults } from '../../redux/actions/apiActions';
import { setMarkers, setRoute } from '../../redux/actions/mapActions';


const startCoords = {
    long: 50.1070,
    lat: 8.2369
}



export class MapComponent extends Component {

    componentDidMount() {



        //Asks for LocationPermission
        this.requestPositionPermission()

        //Gets the users Location and flies to it
        navigator.geolocation.getCurrentPosition(position => {

            console.log("USER_LOCATION_RECEIVED, ", position)
            this.props.updatePosition(position.coords)

        }, error => console.log("POSITION_ERROR" + error))

        //Gets the user Position and updates it to the store
        navigator.geolocation.watchPosition((position) => {

            console.log("USER_LOCATION_CHANGE_RECEIVED, ", position)
            this.props.updatePosition(position.coords)

        }, error => console.log(error))


        console.log(this.props.state)
        this.props.setStart({ long: this.props.UserData.position.longitude, lat: this.props.UserData.position.latitude })
    }

    requestPositionPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, LocationPermissionText)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permissions granted')
            } else {
                console.log('Permissions denied')
            }
        } catch (error) {
            console.log('error during permission request: ', error)
        }
    }




    //This functions checks the state if the Map should Fly to a set of coordinates and executes
    // the Mapbox.MapView.flyTo function in the MapComponentPresential 
    activateMapFlyTo = () => {

        if (this.props.mapFlyTo.flyToActive) {
            this._MapComponentPresentational.mapFlyTo(this.props.mapFlyTo.coords)
            // dispatches the deactivate FlyTo Action to the store using the mapDispatchToProps function from React-Redux
            this.props.deactivateFlyTo()
        }
    }

    componentDidUpdate() {
        this.activateMapFlyTo()

    }

    //Get Point on Map and store it
    getPointOnMap = (event) => {
        const { geometry, properties } = event
        const coords = {
            long: geometry.coordinates[0],
            lat: geometry.coordinates[1]
        }

        this.props.setCoordDestination(coords)

        let stop = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": { icon: 'marker-15' },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            geometry.coordinates[0],
                            geometry.coordinates[1]
                        ]
                    }
                }
            ]
        }

        this.props.setGeoFeature(stop)

        this.setState({ stop })
        this.tripSearch()

    }
    tripSearch = async () => {

        this.props.setStart({ long: this.props.UserData.position.longitude, lat: this.props.UserData.position.latitude })

        const baseURL = "https://www.rmv.de/hapi/trip?accessId=2e275638-45cb-4f79-b647-dcbbfb7a76e2&format=json&numF=2&originWalk=true&destWalk=true"

        let startString = ''

        if (this.props.UserData.start.type == 'STOP_LOCATION') {
            startString = '&originExtId=' + this.props.UserData.start.extId
        } else {
            startString = '&originCoordLat=' + this.props.UserData.start.coords.lat + '&originCoordLong=' + this.props.UserData.start.coords.long
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
        console.log(JSON.stringify(tripLegsGeoJson, 2, 2))
        this.props.setGeoList(tripLegsGeoJson)




    }


    pushCoordinateToLineFeatures = (featureCollection, coords) => {
        featureCollection.features[0].geometry.coordinates.push([coords.long, coords.lat])

        console.log("Hier", featureCollection)

    }

    pushCoordinateToLineFeatures = (featureCollection, coords) => {
        featureCollection.features[0].geometry.coordinates.push([coords.long, coords.lat])

        console.log("Hier", featureCollection)

    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <MapComponentPresentational
                    MapFeatures={this.props.state.MapFeatures.markerGeoJSON}
                    MapLineFeatures={this.props.state.MapFeatures.routeGeoJSON}
                    ref={c => this._MapComponentPresentational = c}
                    startCoordinates={startCoords}
                    onPressHandler={this.getPointOnMap}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
    mapFlyTo: state.UX.mapFlyTo,
    UserData: state.UserData
})

const mapDispatchToProps = dispatch => {
    return {
        deactivateFlyTo: () => dispatch(deactivateMapFlyTo()),
        updatePosition: (coords) => dispatch(setPosition(coords)),

        setCoordDestination: coords => dispatch(setDestinationCoords(coords)),
        setStart: startCoords => dispatch(setStartCoords(startCoords)),

        updateTripResults: (tripResults) => dispatch(setTripResults(tripResults)),

        setGeoFeature: featureList => dispatch(setMarkers(featureList)),
        setGeoList: geoList => dispatch(setRoute(geoList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
