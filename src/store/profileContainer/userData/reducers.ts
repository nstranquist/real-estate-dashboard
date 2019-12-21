
import { UserDataState, UserDataTypes } from './types'

const initialUserDataState: UserDataState = {
  // Profile Data:
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  phone: '',
  role: 'Broker',
  // Data
  myProperties: [],
  myInvestors: [],
  matchedProperties: [],
  matchedInvestors: [],
  // loading and error flags
  loadingUserData: false,
  loadingUserProfileData: false,
  errors: null,
}

export default (
  state = initialUserDataState,
  action: UserDataTypes
): UserDataState => {
  switch(action.type) {
    case 'LOADING_USER_DATA':
      return {
        ...state,
        loadingUserData: true,
        errors: null
      }
    case 'LOADING_USER_PROFILE_DATA':
      return {
        ...state,
        loadingUserProfileData: true,
        errors: null
      }
    // this is the real-time data
    case 'SET_USER_DATA':
      console.log('setting user realtime data')
      return {
        ...state,
        myInvestors: action.myInvestors,
        myProperties: action.myProperties,
        matchedProperties: action.matchedProperties,
        loadingUserData: false
      }
      // this is static data
      case 'SET_USER_PROFILE_DATA':
        console.log('setting user static data')
        return {
          ...state,
          firstName: action.firstName,
          lastName: action.lastName,
          email: action.email,
          companyName: action.companyName,
          phone: action.phone,
          role: action.role,
          loadingUserProfileData: false,
          errors: null,
        }
    case 'TOGGLE_FAVORITE_PROPERTY':
      // add action.id to myProperties
      return {
        ...state,
      }
    case 'TOGGLE_FAVORITE_INVESTOR':
      // add action.id to myInvestors
      return {
        ...state,
      }
    case 'SET_USER_DATA_ERROR':
      return {
        ...state,
        errors: action.err
      }
    default:
      return state
  }
}
