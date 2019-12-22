// root reducer

import { combineReducers } from 'redux'
// reducers
import profileReducer from './profileContainer'
import properties, * as fromProperties from './properties/reducers'
import investors from './investors/reducers'
import brokers from './brokers/reducers'
import ui from './ui'
// import SELECTORS
import * as fromProfile from './profileContainer/userData/reducers'

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

// SELECTORS
// export const selectProperty = (state: RootState) => (
//   fromProperties.selectProperty(state.properties)
// )
export const selectUsername = (state: RootState) => {
  console.log('username:', fromProfile.selectUsername(state.profile.userData))
  return fromProfile.selectUsername(state.profile.userData)
}





export type MaybeString = string | null | undefined
