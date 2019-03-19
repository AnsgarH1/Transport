import React, { Component } from 'react'

import { View, StyleSheet, StatusBar } from 'react-native'
import { mainScreenStyle } from '../styles/styles'


import MapContainer from '../components/container/MapContainer'
import LocatorButton from '../components/container/LocatorButtonContainer';
import SearchStationContainer from '../components/container/SearchStationContainter'
import TripInfoComponentContainer from '../components/container/TripInfoComponentContainer'

export default class MainScreen extends Component {

    render() {
        return (
            <View style={mainScreenStyle.mainScreen}>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0.20)' animated />

                <View style={mainScreenStyle.mapView} >
                    <MapContainer />
                </View>
                <View style={mainScreenStyle.content}>
                    <TripInfoComponentContainer />
                    <LocatorButton />
                    <SearchStationContainer />


                </View>
            </View>
        )
    }
}
/**
 *  <SearchStationContainer />
 */