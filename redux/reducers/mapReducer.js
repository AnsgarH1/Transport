import { combineReducers } from 'redux'
import {SET_ROUTE, RESET_ROUTE, ADD_MARKER, SET_MARKERS, RESET_MARKERS} from '../actions/mapActions'
const routeReducer = (state = {}, action) => {
    switch (action.type){
        case RESET_ROUTE:
            return({})
        case SET_ROUTE:
            return({...state, ...action.payload})
        default:
            return state
    }
}
const markerReducer = (state = {}, action ) => {
    switch (action.type) {
        case ADD_MARKER:   
            return ({...state, ...action.payload})
        case SET_MARKERS:
            return action.payload
        case RESET_MARKERS: 
            return {}
        default: return state
    }
}
export const mapReducer = combineReducers({
    routeGeoJSON: routeReducer,
    markerGeoJSON: markerReducer
})
