import React, { Component } from 'react'
import { View, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'

import MapComponentPresentational from '../presentational/MapComponentPresentational'

import { deactivateMapFlyTo } from '../../redux/actions/uxActions'
import { setPosition, setOriginCoords, setDestinationCoords } from '../../redux/actions/userdataActions';


import { LocationPermissionText } from '../../styles/texts'
import { setTripResults } from '../../redux/actions/apiActions';

//temp
import { resetTrip } from '../../agents/trip'

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
            //Resets the trip origin to the user location
            resetTrip()
        }, error => console.log("POSITION_ERROR" + error))

        //Gets the user Position and updates it to the store
        navigator.geolocation.watchPosition((position) => {

            console.log("USER_LOCATION_CHANGE_RECEIVED, ", position)
            this.props.updatePosition(position.coords)

        }, error => console.log(error))






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
        setStart: startCoords => dispatch(setOriginCoords(startCoords)),

        updateTripResults: (tripResults) => dispatch(setTripResults(tripResults)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
