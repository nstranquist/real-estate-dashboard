// root reducer

import { combineReducers } from 'redux'
// reducers
import profileReducer from './profileContainer'
import properties from './properties/reducers'

// ROOT REDUCER
const rootApp = combineReducers({
  profile: profileReducer,  // combines auth, userData, and ...
  properties
})

export default rootApp

export type RootState = ReturnType<typeof rootApp>


// TYPES
export type MaybeString = string | null | undefined

export interface Property {
  index: number
  name: string
  description: string
  school: string
  amount: number | string
  isFavorite?: boolean
  requirements: string[]
}