import { apiReducer } from './apiReducer'
import { mapReducer } from './mapReducer'
import { uxReducer } from './uxReducer'
import { userDataReducer } from './userdataReducer'
import { tripReducer } from './tripReducer'

import { combineReducers } from 'redux'

export default reducer = combineReducers({
    MapFeatures: mapReducer,
    ApiResults: apiReducer,
    UserData: userDataReducer,
    UX: uxReducer,
    Trip: tripReducer

})
