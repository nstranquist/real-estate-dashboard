
import { UserDataState, UserDataTypes } from './types'

const initialUserDataState: UserDataState = {
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  myProperties: [],
  myInvestors: [],
  matchedProperties: [],
  matchedInvestors: [],
  loadingUserData: false,
  loadingUserStaticData: false,
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
    case 'LOADING_USER_STATIC_DATA':
      return {
        ...state,
        loadingUserStaticData: true,
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
      case 'SET_USER_PRIVATE_DATA':
        console.log('setting user static data')
        return {
          ...state,
          firstName: action.firstName,
          lastName: action.lastName,
          company: action.company,
          loadingUserStaticData: false,
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
