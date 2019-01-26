export const SET_ROUTE = 'SET_ROUTE'
export const RESET_ROUTE = 'RESET_ROUTE'

export const setRoute = geoJson => ({
    type: SET_ROUTE,
    payload: geoJson
})
export const resetRoute = ()=>({
    type: RESET_ROUTE
})

export const SET_MARKERS = 'SET_MARKERS'
export const ADD_MARKER = 'ADD_MARKER'
export const RESET_MARKERS = 'RESET_MARKERS'

export const setMarkers = markerlist => ({
    type: SET_MARKERS,
    payload: markerlist
})

export const addMarker = marker => ({
    type: ADD_MARKER,
    payload: marker
})

export const resetMarkers = () => ({
    type: RESET_MARKERS
})