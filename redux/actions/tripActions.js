export const SET_LEG = 'SET_LEG'
export const RESET_LEG = 'RESET_LEG'

export const SET_ORIGIN = 'SET_ORIGIN'
export const RESET_ORIGIN = 'RESET_ORIGIN'

export const SET_DESTINATION = 'SET_DESTINATION'
export const RESET_DESTINATION = 'RESET_DESTINATION'


export const setLeg = legs => ({
    type: SET_LEG,
    payload: legs
})
export const resetLeg = () => ({
    type: RESET_LEG
})


export const setOrigin = tripOrigin => ({
    type: SET_ORIGIN,
    payload: tripOrigin
})
export const resetOrigin = () => ({
    type: RESET_ORIGIN
})


export const setDestination = tripDestination => ({
    type: SET_DESTINATION,
    payload: tripDestination
})
export const resetDestination = () => ({
    type: RESET_DESTINATION
})