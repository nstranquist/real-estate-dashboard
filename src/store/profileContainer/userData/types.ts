
export interface UserDataState {
  firstName: string,
  lastName: string,
  email: string,
  company?: string,
  loadingUserData: boolean
  loadingUserStaticData: boolean
  myProperties: number[] | null
  myInvestors: number[] | null
  matchedProperties: number[] | null
  matchedInvestors: string[] | null
  errors: any[] | null
}

// realtime data
export interface SetUserData {
  readonly type: 'SET_USER_DATA'
  myInvestors: number[] | null
  myProperties: number[] | null
  matchedProperties: number[] | null
  matchedInvestors: number[] | null
}
// static data
export interface SetUserPrivateData {
  readonly type: 'SET_USER_PRIVATE_DATA'
  firstName: string
  lastName: string
  email: string
  company?: string
  // profile url
  // other stats
}
export interface ToggleFavoriteProperty {
  readonly type: 'TOGGLE_FAVORITE_PROPERTY'
  index: number
}
export interface ToggleFavoriteInvestor {
  readonly type: 'TOGGLE_FAVORITE_INVESTOR'
  index: number
}
export interface SetUserDataError {
  readonly type: 'SET_USER_DATA_ERROR'
  err: any
}

export type UserDataTypes = 
| {readonly type: 'LOADING_USER_DATA'}
| {readonly type: 'LOADING_USER_STATIC_DATA'}
| SetUserData
| SetUserPrivateData
| ToggleFavoriteProperty
| ToggleFavoriteInvestor
| SetUserDataError
