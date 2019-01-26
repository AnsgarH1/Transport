import { store } from '../store'

export const SET_POSITION = 'SET_POSITION'
export const RESET_POSITION = 'RESET_POSITION'

export const setPosition = (coords = { long, lat }) => ({
    type: SET_POSITION,
    payload: coords
})

export const resetPosition = () => ({
    type: RESET_POSITION
})

export const SET_START_STATION = 'SET_START_STATION'
export const SET_START_COORDS = 'SET_START_COORDS'
export const RESET_START = 'RESET_START'

export const setStartStation = extI => ({
    type: SET_START_STATION,
    payload: extId
})

export const setStartCoords = (coords = { long, lat }) => ({
    type: SET_START_COORDS,
    payload: coords
})

export const resetStart = () => ({
    type: RESET_START
})



export const SET_DESTINATION_COORDS = 'SET_DESTINATION_COORDS'
export const SET_DESTINATION_STATION = 'SET_DESTINATION_STATION'
export const RESET_DESTINATION = 'RESET_DESTINATION'

export const setDestinationStation = extId => ({
    type: SET_DESTINATION_STATION,
    payload: extId
})

export const setDestinationCoords = (coords = { long, lat }) => ({
    type: SET_DESTINATION_COORDS,
    payload: coords
}) 

export const resetDestination = () => ({
    type: RESET_DESTINATION,

})