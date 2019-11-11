import { AuthState, AuthActionTypes } from './types'

// profile auth
const initialState: AuthState = {
  isAuthenticated: false,
  loadingAuth: false,
  errors: null
}

export default (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case 'LOADING_AUTH':
      return {
        ...state,
        loadingAuth: true,
        errors: null
      }
    case 'AUTHENTICATE':
      return {
        ...state,
        isAuthenticated: true,
        loadingAuth: false,
      }  
    case 'UNAUTHENTICATE':
      // TODO: needs to reset auth state and user state
      return {
        ...state,
        isAuthenticated: false,
        loadingAuth: false,
      }
    case 'SET_AUTH_ERROR':
      console.log('error with authentication')
      return {
        ...state,
        loadingAuth: false,
        errors: action.err,
      }
    default:
      return state
  }
}

