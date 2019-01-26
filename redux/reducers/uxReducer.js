import { combineReducers } from 'redux'
import { ACTIVATE_MAP_FLY_TO, DEACTIVATE_MAP_FLY_TO } from '../actions/uxActions'

const flyToReducer = (state = { flyToActive: false }, action) => {

    switch (action.type) {
        case ACTIVATE_MAP_FLY_TO:
            return {
                flyToActive: true,
                coords: {
                    long: action.payload.long,
                    lat: action.payload.lat
                }
            }
        case DEACTIVATE_MAP_FLY_TO:
            return { flyToActive: false, coords: null }
        default: return state
    }
}

export const uxReducer = combineReducers({
    mapFlyTo: flyToReducer
})