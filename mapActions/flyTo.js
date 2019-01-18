import store from '../redux/store'

import { updateMapFeatures } from '../redux/actions'

export default MapFlyTo = (long, lat) => {



    mapUI = {
        mapUI: {
            flyToActive: true,
            coordinates: [long, lat]
        }
    }

    store.dispatch(updateMapFeatures(mapUI))
}