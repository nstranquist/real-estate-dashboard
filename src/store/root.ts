// root reducer

import { combineReducers } from 'redux'
// reducers
import profileReducer from './profileContainer'
import properties from './properties/reducers'
import investors from './investors/reducers'
import brokers from './brokers/reducers'
import ui from './ui'

// ROOT REDUCER
const rootApp = combineReducers({
  profile: profileReducer,  // combines auth, userData
  properties,
  investors,
  brokers,
  ui
})

export default rootApp

export type RootState = ReturnType<typeof rootApp>


// TYPES
export type MaybeString = string | null | undefined
