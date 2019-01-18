
import PointIcon from '../assets/placeIcon.png'

import React, { Component } from 'react'
import { View, StyleSheet, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'
import store from '../redux/store'
import { updateUI } from '../redux/actions'

import MapFlyTo from '../mapActions/flyTo'

import MapboxGL from '@mapbox/react-native-mapbox-gl';


MapboxGL.setAccessToken('pk.eyJ1IjoibGFuZGViYW5hbmUiLCJhIjoiY2pxNnU4ZDBjMmJsdzQ4dGQ5dmFzMXEyZSJ9.whDClIyCqxmtb5zzCQac3A');
let startup = true;

class MapComponent extends Component {

    componentDidMount() {
        this.getLocation()
        
    }

    getLocation = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'The App needs location permission to find your position.'
            }
        ).then(granted => {
            console.log(granted);
            navigator.geolocation.getCurrentPosition((position) => { this._mapView.flyTo([position.coords.longitude, position.coords.latitude], 10) }, (error) => console.log(error))
        }).catch(err => {
            console.warn(err);
        });

        
    }

    componentDidUpdate() {

        this.FlyTo()
    }
    FlyTo = () => {
        const state = this.props.UI

        if (state.mapUI.flyToActive) {
            this._mapView.flyTo(this.props.UI.mapUI.coordinates)
            this._mapView.zoomLevel = 15
            const disableFlyTo = {
                mapUI: {
                    flyToActive: false,
                    coordinates: []
                }
            }
            store.dispatch(updateUI(disableFlyTo))
        }
    }

    render() {


        return (
            <View style={{ flex: 1 }}>
                <MapboxGL.MapView
                    ref={c => { this._mapView = c }}
                    styleURL={MapboxGL.StyleURL.Street}
                    zoomLevel={12}
                    showUserLocation={true}
                    centerCoordinate={[8.243, 50.07]}
                    style={styles.container}
                    debugActive
                    attributionEnabled={false}
                    logoEnabled={false}>
                    <MapboxGL.ShapeSource
                        id="pointAnnotations"
                        shape={this.props.MapFeatures.annotations}>
                        <MapboxGL.SymbolLayer
                            key="SymbolIcons"
                            id="SymbolIcons"
                            style={mapStyles.icon}
                        />
                    </MapboxGL.ShapeSource>

                </MapboxGL.MapView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStyles = MapboxGL.StyleSheet.create({
    icon: {
        iconImage: PointIcon,
        iconSize: 0.2
    }
})



const mapStateToProps = state => {
    return {
        MapFeatures: state.MapFeatures,
        UI: state.UI
    }
}

export default connect(mapStateToProps)(MapComponent)