
export const STATION_SEARCH_RESULT = 'STATION_SEARCH_RESULT'

export const CREATE_ANNOTATIONS = "CREATE_ANNOTATIONS"

export const UPDATE_UI = "UPDATE_UI"

export const updateUI = data => ({
    type: UPDATE_UI,
    payload: data
})

export const createAnnotations = data => ({
    type: CREATE_ANNOTATIONS,
    payload: data
})

export const stationSearchResult = stationList => ({
    type: STATION_SEARCH_RESULT,
    payload: stationList
})