import store from '../redux/store'

import { updateUI } from '../redux/actions'

export default MapFlyTo = (long, lat) => {



    stateUI = {
        mapUI: {
            flyToActive: true,
            coordinates: [long, lat]
        }
    }

    store.dispatch(updateUI(stateUI))
}