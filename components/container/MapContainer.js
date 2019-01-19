import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import MapComponentPresentational from '../presentational/MapComponentPresentational'
import store from '../../redux/store'
import { deactivateFlyToAction, updateMapFeatures, updateUI } from '../../redux/actions';
import { Button } from 'react-native-elements';

const coords = {
    long: 50.071,
    lat: 8.233
}

export class MapComponent extends Component {

    //This functions checks the state if the Map should Fly to a set of coordinates and executes
    // the Mapbox.MapView.flyTo function in the MapComponentPresential 
    activateMapFlyTo = () => {
        if (this.props.mapData.mapUI.flyToActive) {
            console.log('Here')
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
        console.log(this.props.selectedStation)
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
                <MapComponentPresentational MapFeatures={null} ref={c => this._MapComponentPresentational = c} startCoordinates={coords} />

            </View>
        )
    }
}

const mapStateToProps = state => ({
    mapData: state.MapFeatures,
    selectedStation: state.UI.selectedStation
})

const mapDispatchToProps = dispatch => {
    return {
        deactivateFlyTo: () => dispatch(deactivateFlyToAction()),
        updateMapUI: newMapData => dispatch(updateMapFeatures(newMapData)),
        updateUserInfo: newUserData => dispatch(updateUI(newUserData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
