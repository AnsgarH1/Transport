import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'

import { mapStyles } from '../../styles/styles'

import MapboxGL from '@mapbox/react-native-mapbox-gl';
MapboxGL.setAccessToken('pk.eyJ1IjoibGFuZGViYW5hbmUiLCJhIjoiY2pxNnU4ZDBjMmJsdzQ4dGQ5dmFzMXEyZSJ9.whDClIyCqxmtb5zzCQac3A');



export class MapComponentPresential extends Component {
    constructor(props) {
        super(props)

    }
    //Activates the MapboxGL.MapView FlyTo function wich flies to a set of coordinates
    mapFlyTo = (coords, duration = 2000) => {

        this._mapView.setCamera({
            centerCoordinate: [coords.long, coords.lat],
            duration: duration,
            zoom: 14,
            mode: MapboxGL.CameraModes.Flight,
        })

    }


    returnSymbols = () => {
        return (
            <MapboxGL.ShapeSource
                id="PointsInMap"
                shape={this.props.MapFeatures}>
                <MapboxGL.SymbolLayer
                    id="SymbolInShapesource"

                    style={mapStyles.icon}
                />


            </MapboxGL.ShapeSource>

        )
    }

    returnLine = () => {
        return (
            <MapboxGL.ShapeSource
                id="LineOnMap"
                shape={this.props.MapLineFeatures}>
                <MapboxGL.LineLayer
                    id='LineLayer'
                    style={mapStyles.Line} />
            </MapboxGL.ShapeSource>
        )
    }


    render() {
        return (
            <TouchableOpacity style={{ flex: 1 }}>
                <MapboxGL.MapView
                    ref={c => this._mapView = c}
                    styleURL={MapboxGL.StyleURL.Dark}
                    zoomLevel={12}
                    showUserLocation={true}
                    centerCoordinate={[this.props.startCoordinates.lat, this.props.startCoordinates.long]}
                    style={{ flex: 1 }}
                    debugActive
                    attributionEnabled={false}
                    logoEnabled={false}
                    compassEnabled={true}
                    pitchEnabled={false}
                    localizeLabels={true}
                    onPress={(event) => {this.props.onPressHandler(event)}}>

                    {this.props.MapLineFeatures != null ? this.returnLine() : null}
                    {this.props.MapFeatures != null ? this.returnSymbols() : null}
                </MapboxGL.MapView>
            </TouchableOpacity>
        )
    }
}

export default MapComponentPresential