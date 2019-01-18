import { CREATE_ANNOTATIONS, STATION_SEARCH_RESULT, UPDATE_UI } from './actions'


import { combineReducers } from 'redux'

const merge = (prev, next) => Object.assign({}, prev, next)

const annotationReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ANNOTATIONS:
            return merge(state, action.payload)
        default:
            return state
    }
}

const stationSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case STATION_SEARCH_RESULT:
            return (merge(state, action.payload))
        default:
            return state
    }
}


const apiReducer = combineReducers({
    StationSearchResults: stationSearchReducer
})

const mapReducer = combineReducers({
    annotations: annotationReducer
})

const uiReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_UI:
            return (merge(state, action.payload))
        default:
            return state
    }
}
export default reducer = combineReducers({
    MapFeatures: mapReducer,
    apiResults: apiReducer,
    UI: uiReducer
})
