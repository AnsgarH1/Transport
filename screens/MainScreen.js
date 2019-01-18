import React, { Component } from 'react'

import { View, StyleSheet, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native'

import MapComponent from '../components/MapComponent'
import SearchStationComponent from '../components/SearchStationComponent'
import SearchHereComponent from '../components/SearchHereComponent';

export default class MainScreen extends Component {
    componentDidMount(){

    }
    
    render() {
        return (
            <View style={styles.mainScreen}>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0.70)' animated />

                <View style={styles.mapView} >
                    <MapComponent />
                </View>

                <View style={styles.content}>
                    <SearchHereComponent/>
                    <SearchStationComponent />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,

    },
    mapView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    content: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        padding: 8,
        paddingBottom: 20,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

})