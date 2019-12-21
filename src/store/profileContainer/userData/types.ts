
export interface UserDataState {
  // Profile Data
  firstName: string
  lastName: string
  email: string
  companyName: string
  phone: string
  role: 'Broker' | 'Principal'
  // loading flags
  loadingUserData: boolean
  loadingUserProfileData: boolean
  // Data
  myProperties: number[] | null
  myInvestors: number[] | null
  matchedProperties: number[] | null
  matchedInvestors: string[] | null
  // errors
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
export interface SetUserProfileData {
  readonly type: 'SET_USER_PROFILE_DATA'
  firstName: string
  lastName: string
  email: string
  companyName: string
  phone: string
  role: 'Broker' | 'Principal'
  // profile url, other stats
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
| {readonly type: 'LOADING_USER_PROFILE_DATA'}
| SetUserData
| SetUserProfileData
| ToggleFavoriteProperty
| ToggleFavoriteInvestor
| SetUserDataError
