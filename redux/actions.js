
export const UPDATE_STATION_SEARCH_RESULT = 'UPDATE_STATION_SEARCH_RESULT'

export const UPDATE_MAP_FEATURES = "UPDATE_MAP_FEATURES"

export const UPDATE_UI = "UPDATE_UI"

export const updateUI = data => ({
    type: UPDATE_UI,
    payload: data
})

export const updateMapFeatures = data => ({
    type: UPDATE_MAP_FEATURES,
    payload: data
})

export const updateStationSearchResult = stationList => ({
    type: UPDATE_STATION_SEARCH_RESULT,
    payload: stationList
})


export const deactivateFlyToAction = () => ({
    type: UPDATE_MAP_FEATURES,
    payload: {
        mapUI: {
            flyToActive: false,
            coordinates: []
        }
    }
})