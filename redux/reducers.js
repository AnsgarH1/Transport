import {
    UPDATE_MAP_FEATURES,
    UPDATE_STATION_SEARCH_RESULT,
    UPDATE_UI, NEW_SELECTED_STATION,
    UPDATE_DEPARTURE_RESULTS
} from './actions'


import { combineReducers } from 'redux'

const merge = (prev, next) => Object.assign({}, prev, next)

const stationSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_STATION_SEARCH_RESULT:
            return ({ ...state, ...action.payload })
        default:
            return state
    }
}

const departureResultsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_DEPARTURE_RESULTS:
            return ({ ...state, ...action.payload })
        default:
            return state
    }
}

const apiReducer = combineReducers({
    StationSearchResults: stationSearchReducer,
    DepartureResults: departureResultsReducer
})

const mapReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_MAP_FEATURES:
            return ({ ...state, ...action.payload })
        default:
            return state
    }
}


const uiReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_UI:
            return ({ ...state, ...action.payload })
        case NEW_SELECTED_STATION:
            return ({ ...state, ...action.payload })
        default:
            return state
    }
}
export default reducer = combineReducers({
    MapFeatures: mapReducer,
    apiResults: apiReducer,
    UI: uiReducer,
})
