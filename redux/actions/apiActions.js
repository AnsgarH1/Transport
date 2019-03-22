export const SET_TRIP_RESULTS = 'SET_TRIP_RESULTS'
export const RESET_TRIP_RESULTS = 'RESET_TRIP_RESULTS'
export const ADD_TRIP_RESULT = 'ADD_TRIP_RESULT'

export const setTripResults = tripData => ({
    type: SET_TRIP_RESULTS,
    payload: tripData
})

export const resetTripResults = () => ({
    type: RESET_TRIP_RESULTS
})
export const addTripResult = trip => ({
    type: ADD_TRIP_RESULT,
    payload: trip
})

export const SET_STATIONSEARCH_RESULTS = 'SET_STATIONSEARCH_RESULTS'
export const RESET_STATIONSEARCH_RESULTS = 'RESET_STATIONSEARCH_RESULTS'

export const setStationsResults = (stationsResults = []) => ({
    type: SET_STATIONSEARCH_RESULTS,
    payload: stationsResults
})

export const resetStationsResults = () => ({
    type: RESET_STATIONSEARCH_RESULTS
})