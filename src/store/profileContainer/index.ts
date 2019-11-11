import { combineReducers } from 'redux'
import authReducer from './auth/reducers'
import userReducer from './userData/reducers'

export default combineReducers({
  auth: authReducer,
  userData: userReducer
})