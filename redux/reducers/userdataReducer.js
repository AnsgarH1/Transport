import { combineReducers } from 'redux'
import {
    SET_POSITION,
    RESET_POSITION,
    SET_DESTINATION_COORDS,
    SET_DESTINATION_STATION,
    RESET_DESTINATION,

    SET_ORIGIN_COORDS,
    SET_ORIGIN_STATION,
    RESET_ORIGIN

} from '../actions/userdataActions'

const positionReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_POSITION:
            return (action.payload)
        case RESET_POSITION:
            return ({})
        default:
            return state
    }
}

const destinationReducer = (state = { type: 'COORD_LOCATION', coords: {}, extId: null }, action) => {
    switch (action.type) {
        case SET_DESTINATION_STATION:
            return ({
                type: 'STOP_LOCATION',
                extId: action.payload
            })
        case SET_DESTINATION_COORDS:
            return ({
                type: 'COORD_LOCATION',
                coords: action.payload
            })
        case RESET_DESTINATION:
            return (null)
        default:
            return state
    }
}

const originReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ORIGIN_COORDS: {
            return ({
                type: 'COORD_LOCATION',
                coords: action.payload

            })
        }
        case SET_ORIGIN_STATION: {
            let returnData = {
                type: 'STOP_LOCATION',
                extId: action.payload,
                coords: null
            }
            return returnData
        }
        case RESET_ORIGIN: {
            return ({
                type: 'COORD_LOCATION'
            })
        }
        default: return state
    }
}

export const userDataReducer = combineReducers({
    position: positionReducer,
    destination: destinationReducer,
    start: originReducer
})