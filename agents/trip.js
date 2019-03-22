import store from '../redux/store'
import { setLeg, resetLeg, setOrigin, resetOrigin, setDestination, resetDestination } from '../redux/actions/tripActions'


export const resetTrip = () => {
    store.dispatch(resetLeg())
    store.dispatch(resetDestination())

    const state = store.getState()
    const userPosition = { lat: state.UserData.position.latitude, long: state.UserData.position.longitude }
    const originCoords = userPosition

    const defaultOrigin = {
        type: 'COORDS',
        coords: originCoords,
        station: null
    }

    store.dispatch(setOrigin(defaultOrigin))



}

export const setTripOrigin = (type = null, station, coords) => {
    let baseOrigin = {
        type: null,
        coords: null,
        station: null
    }

    let origin

    switch (type) {
        case 'COORDS':
            origin = { ...baseOrigin, ...{ type: 'COORDS', coords: coords } }
            break
        case 'STATION':
            origin = { ...baseOrigin, ...{ type: 'STATION', station: station } }
            break
        default:
            origin = baseOrigin
    }

    store.dispatch(setOrigin(origin))
}

export const setTripDestination = (type = null, station, coords) => {
    let baseDestination = {
        type: null,
        coords: null,
        station: null
    }

    let destination

    switch (type) {
        case 'COORDS':
            destination = { ...baseDestination, ...{ type: 'COORDS', coords: coords } }
            break
        case 'STATION':
            destination = { ...baseDestination, ...{ type: 'STATION', station: station } }
            break
        default:
            destination = baseDestination
    }

    store.dispatch(setDestination(destination))
}

export const resetTripOrigin = () => {
    store.dispatch(resetOrigin())
}

export const resetTripDestination = () => {
    store.dispatch(resetDestination())
}

export const setTripLegs = legs => {
    store.dispatch(setLeg(legs))
}

export const resetTripLegs = () => {
    store.dispatch(resetLeg())
}

