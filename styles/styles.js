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
        backgroundColor: theme.BACKGROUND_COLOR,
        width: '100%',
        borderRadius: 5,
        borderColor: theme.PRIMARY_COLOR_LIGHT,
        borderWidth: 1,
        opacity: theme.CONTAINER_OPACITY,
        padding: 4
    },
    labelStyle: {
        fontSize: theme.FONT_SIZE_LARGE,
        color: theme.ON_BACKGROUND_COLOR
    },
    inputContainer: {

        backgroundColor: theme.PRIMARY_COLOR_LIGHT
    },
    scrollViewStyle: {
        padding: 4,
        width: '100%',
        height: 200,
        backgroundColor: theme.BACKGROUND_COLOR
    }
}
)

export const styles = StyleSheet.create({
    largeButtonText: {

    }

})

export const mapStyles = MapboxGL.StyleSheet.create({
    icon: {
        iconImage: '{icon}',
        iconSize: 1.5
    },
    Line: {
        lineColor: theme.SECONDARY_COLOR,
        lineWidth: 3.3,
        lineOpacity: 0.8
    }
})

export const locatorStyle = StyleSheet.create({
    container: {
        borderRadius: 25,
        width: 50,
        height: 50,
        margin: 4,
        marginBottom: 8,
        marginLeft: '85%',
        opacity: theme.CONTAINER_OPACITY,
        backgroundColor: theme.BACKGROUND_COLOR,
        justifyContent:'center'
    },
    Icon: {
        fontSize: theme.FONT_SIZE_LARGE,
        color: theme.ON_BACKGROUND_COLOR
    }
})

export const stationInfoStyle = StyleSheet.create({
    container: {
        backgroundColor: theme.BACKGROUND_COLOR,
        width: '70%',
        height: 300,
        borderColor: theme.PRIMARY_COLOR_LIGHT,
        borderWidth: 1,
        borderRadius: 20,
        margin: 4,
        opacity: theme.CONTAINER_OPACITY,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        color: theme.ON_BACKGROUND_COLOR,
        fontSize: theme.FONT_SIZE_MEDIUM,
        textAlign: 'center'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems:'center',
        flex: 1,
        width: "90%"
    },
    contentText: {
        color: theme.ON_BACKGROUND_COLOR,
        fontSize: theme.FONT_SIZE_SMALL
    },
    contentContainer: {
        flex: 3,
        width: '90%',
        borderTopColor: theme.PRIMARY_COLOR_LIGHT,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonContainer: {
        width: '90%',
        flex: 1,
        borderTopColor: theme.PRIMARY_COLOR_LIGHT,
        borderTopWidth: 1,

        alignItems: 'center',
        justifyContent:'space-evenly',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: theme.PRIMARY_COLOR_DARK,
        borderColor: theme.PRIMARY_COLOR_LIGHT,
        height: 40,
        width: 100
    },
    scrollViewStyleContainer: {
        padding: 4,
        width: 230,
        height: 150,
        backgroundColor: theme.BACKGROUND_COLOR,
        
    },
    listItem: {
        margin: 2,
        backgroundColor: theme.PRIMARY_COLOR_LIGHT,

    }
})