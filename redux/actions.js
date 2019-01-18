
export const STATION_SEARCH_RESULT = 'STATION_SEARCH_RESULT'

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

export const stationSearchResult = stationList => ({
    type: STATION_SEARCH_RESULT,
    payload: stationList
})