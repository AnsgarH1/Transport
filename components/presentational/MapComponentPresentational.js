import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

import theme from '../../styles/theme.style'
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
            zoom: 15.5,
            mode: MapboxGL.CameraModes.Flight,
        })

    }

    returnSymbols = () => {
        return (
            <MapboxGL.ShapeSource
                id={this.props.ShapeSource.id}
                shape={this.props.ShapeSource.shape}>
                <MapboxGL.SymbolLayer
                    id={this.props.SymbolLayer.id}
                    style={mapStyles.AnnotationIcon}
                />
            </MapboxGL.ShapeSource>

        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
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
                    compassEnabled={false}
                    pitchEnabled={false}
                    localizeLabesl={true}>

                </MapboxGL.MapView>
                {this.props.MapFeatures != null ? this.returnSymbols : null}
            </View>
        )
    }
}

export default MapComponentPresential