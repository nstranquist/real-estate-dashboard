import { combineReducers } from 'redux'
import authReducer, * as fromAuth from './auth/reducers'
import userReducer, * as fromProfile from './userData/reducers'

export default combineReducers({
  auth: authReducer,
  userData: userReducer
})

export {
  fromAuth,
  fromProfile
}