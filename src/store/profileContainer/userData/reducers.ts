
import { UserDataState, UserDataTypes } from './types'

const initialUserDataState: UserDataState = {
  myProperties: [],
  matchedProperties: [],
  mySchools: [],
  //matchedSchools: [],
  school: '',
  email: '',
  name: '',
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
        mySchools: action.mySchools,
        myProperties: action.myProperties,
        matchedProperties: action.matchedProperties,
        loadingUserData: false
      }
      // this is static data
      case 'SET_USER_PRIVATE_DATA':
        console.log('setting user static data')
        return {
          ...state,
          school: action.school,
          loadingUserStaticData: false,
          errors: null,
        }
    case 'TOGGLE_FAVORITE_PROPERTY':
      // add action.id to myProperties
      return {
        ...state,
      }
    case 'TOGGLE_FAVORITE_SCHOOL':
      // add action.id to mySchools
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
