export const ACTIVATE_MAP_FLY_TO = 'ACTIVATE_MAP_FLY_TO'
export const DEACTIVATE_MAP_FLY_TO = 'DEACTIVATE_MAP_FLY_TO'

export const activateMapFlyTo = (coords = { long: null, lat: null }) => {
    return ({
        type: ACTIVATE_MAP_FLY_TO,
        payload: coords
    })
}

export const deactivateMapFlyTo = () => ({
    type: DEACTIVATE_MAP_FLY_TO
})
