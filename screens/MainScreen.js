import React, { Component } from 'react'

import { View, StyleSheet, StatusBar } from 'react-native'
import { mainScreenStyle } from '../styles/styles'

import SearchStationComponent from '../components/SearchStationComponent'

import MapContainer from '../components/container/MapContainer'
import SearchStationContainer from '../components/container/SearchStationContainter';

export default class MainScreen extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <View style={mainScreenStyle.mainScreen}>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0.20)' animated />

                <View style={mainScreenStyle.mapView} >
                    <MapContainer />
                </View>

                <View style={mainScreenStyle.content}>
                    
                    <SearchStationContainer />

                </View>
            </View>
        )
    }
}