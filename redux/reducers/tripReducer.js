import {
    SET_LEG,
    RESET_LEG,

    SET_ORIGIN,
    RESET_ORIGIN,

    SET_DESTINATION,
    RESET_DESTINATION
} from '../actions/tripActions'

import { combineReducers } from 'redux'

const legReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_LEG:
            return { ...state, ...action.payload }
        case RESET_LEG:
            return {}
        default:
            return state

    }
}

const originReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ORIGIN:
            return { ...state, ...action.payload }
        case RESET_ORIGIN:
            return {}
        default:
            return state
    }
}
const destinationReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_DESTINATION:
            return { ...state, ...action.payload }
        case RESET_DESTINATION:
            return {}
        default:
            return state
    }
}

export const tripReducer = combineReducers({
    Legs: legReducer,
    Origin: originReducer,
    Destination: destinationReducer
})