import { createStore } from 'redux'

import reducer from './reducers'

import { updateUI, updateMapFeatures } from './actions'

const store = createStore(reducer)

const mapFeatures = {
    mapUI: {
        flyToActive: false,
        coords: []
    }
}

const UI = {
    selectedStation: {
        StopLocation: null,
        flyToSelected: false
    }
}

store.dispatch(updateMapFeatures(mapFeatures))
store.dispatch(updateUI(UI))

export default store