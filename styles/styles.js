import { StyleSheet, Dimensions } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import theme from './theme.style'

import AnnotationIcon from '../assets/placeIcon.png'

export const mainScreenStyle = StyleSheet.create({
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
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

})


export const SearchStationInputStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: theme.PRIMARY_COLOR,
        width: '100%',
        borderRadius: 5,
        borderColor: theme.PRIMARY_COLOR_LIGHT,
        borderWidth: 1,

        padding: 4
    },
    labelStyle: {
        fontSize: theme.FONT_SIZE_LARGE,
        color: theme.ON_PRIMARY_COLOR
    },
    inputContainer: {

        backgroundColor: theme.BACKGROUND_COLOR
    },
    scrollViewStyle: {
        padding: 4,
        width: '100%',
        height: 200,
        backgroundColor: theme.PRIMARY_COLOR
    }
}
)

export const styles = StyleSheet.create({
    largeButtonText: {

    }

})

export const mapStyles = MapboxGL.StyleSheet.create({
    AnnotationIcon: {
        iconImage: AnnotationIcon,
        iconSize: 0.1
    }
})

