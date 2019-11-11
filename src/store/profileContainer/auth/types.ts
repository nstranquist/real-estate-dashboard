

export interface AuthState {
  isAuthenticated: boolean
  loadingAuth: boolean
  errors: any
}

export interface SetAuthError {
  readonly type: 'SET_AUTH_ERROR'
  err: any
}

export type AuthActionTypes =
| { readonly type: 'LOADING_AUTH' }
| { readonly type: 'AUTHENTICATE' }
| { readonly type: 'UNAUTHENTICATE' }
| SetAuthError
