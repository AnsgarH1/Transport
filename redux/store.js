import { createStore } from 'redux'

import reducer from './reducers'

import { updateUI, createAnnotations } from './actions'

const store = createStore(reducer)

const UI = {
    selectedItems: {},
    mapUI: {
        flyToActive: false,
        coordinates: []
    }
}



store.dispatch(updateUI(UI))

export default store