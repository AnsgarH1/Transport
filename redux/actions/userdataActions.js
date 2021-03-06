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

export const SET_ORIGIN_STATION = 'SET_ORIGIN_STATION'
export const SET_ORIGIN_COORDS = 'SET_ORIGIN_COORDS'
export const RESET_ORIGIN = 'RESET_ORIGIN'

export const setOriginStation = extId => ({
    type: SET_ORIGIN_STATION,
    payload: extId
})

export const setOriginCoords = (coords = { long, lat }) => ({
    type: SET_ORIGIN_COORDS,
    payload: coords
})

export const resetOrigin = () => ({
    type: RESET_ORIGIN
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