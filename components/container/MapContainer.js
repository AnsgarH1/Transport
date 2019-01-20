import React, { Component } from 'react'
import { View, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'

import MapComponentPresentational from '../presentational/MapComponentPresentational'
import { deactivateFlyToAction, updateMapFeatures, updateUI } from '../../redux/actions';

import { LocationPermissionText } from '../../styles/texts'

const startCoords = {
    long: 50.1070,
    lat: 8.2369
}

const feature = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.236913681030273,
                    50.071739459820954
                ]
            }
        }
    ]
}

export class MapComponent extends Component {

    componentDidMount() {
        //Asks for LocationPermission
        this.requestPositionPermission()

        //Gets the users Location and flies to it
        navigator.geolocation.getCurrentPosition(position => {
            console.log("USER_LOCATION_RECEIVED, ",position)
            this.props.updateUserInfo({ position })
            this.props.updateMapUI({
                mapUI: {
                    flyToActive: true,
                    coords: {
                        long: position.coords.longitude,
                        lat: position.coords.latitude
                    }
                }
            })
            console.log(this.props.userInfo.position)
        }, error => console.log("POSITION_ERROR" + error))

        //Gets the user Position and updates it to the store
        navigator.geolocation.watchPosition((position) => {
            console.log("USER_LOCATION_CHANGE_RECEIVED, ", position)
            this.props.updateUserInfo({ position })
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
        if (this.props.mapData.mapUI.flyToActive) {
            this._MapComponentPresentational.mapFlyTo(this.props.mapData.mapUI.coords)
            // dispatches the deactivate FlyTo Action to the store using the mapDispatchToProps function from React-Redux
            this.props.deactivateFlyTo()
        }
    }
    componentDidUpdate() {
        this.activateMapFlyTo()

        this.newStationSelected()

    }
    //Checks if the User hast selected a new Station and flies to it
    newStationSelected = () => {
        if (this.props.selectedStation.flyToSelected) {

            this.props.updateMapUI({
                mapUI: {
                    flyToActive: true,
                    coords: {
                        long: this.props.selectedStation.StopLocation.lon,
                        lat: this.props.selectedStation.StopLocation.lat
                    }
                }
            })
            //Disables the the activated Station
            this.props.updateUserInfo({
                selectedStation: {
                    StopLocation: null,
                    flyToSelected: false
                }
            })
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapComponentPresentational
                    MapFeatures={null}
                    ref={c => this._MapComponentPresentational = c}
                    startCoordinates={startCoords} />

            </View>
        )
    }
}

const mapStateToProps = state => ({
    mapData: state.MapFeatures,
    selectedStation: state.UI.selectedStation,
    userInfo: state.UI,
})

const mapDispatchToProps = dispatch => {
    return {
        deactivateFlyTo: () => dispatch(deactivateFlyToAction()),
        updateMapUI: newMapData => dispatch(updateMapFeatures(newMapData)),
        updateUserInfo: newUserData => dispatch(updateUI(newUserData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
