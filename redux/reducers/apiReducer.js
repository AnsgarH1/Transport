import {
    SET_TRIP_RESULTS,
    RESET_TRIP_RESULTS,
    SET_STATIONSEARCH_RESULTS,
    RESET_STATIONSEARCH_RESULTS
} from '../actions/apiActions'

import { combineReducers } from 'redux'


const tripResultsReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_TRIP_RESULTS:
            console.log("HERE_REDUCER,", action.payload)
            return { ...state, ...action.payload }
        case RESET_TRIP_RESULTS:
            return ({})
        default:
            return state
    }
}

const stationSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_STATIONSEARCH_RESULTS:
            return {...state, ...action.payload }
        case RESET_STATIONSEARCH_RESULTS:
            return {}
        default:
            return state
    }
}


export const apiReducer = combineReducers({
    StationSearchResults: stationSearchReducer,
    //DepartureResults: departureResultsReducer,
    TripResults: tripResultsReducer
})
