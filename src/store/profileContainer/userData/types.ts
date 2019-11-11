
export interface UserDataState {
  name: string,
  email: string,
  school?: string,
  loadingUserData: boolean
  loadingUserStaticData: boolean
  mySchools: number[] | null
  myProperties: number[] | null
  matchedProperties: number[] | null
  //machedSchools: string[] | null
  errors: any[] | null
}

// realtime data
export interface SetUserData {
  readonly type: 'SET_USER_DATA'
  mySchools: number[] | null
  myProperties: number[] | null
  matchedProperties: number[] | null
}
// static data
export interface SetUserPrivateData {
  readonly type: 'SET_USER_PRIVATE_DATA'
  name: string
  email: string
  school?: string
}
export interface ToggleFavoriteProperty {
  readonly type: 'TOGGLE_FAVORITE_PROPERTY'
  index: number
}
export interface ToggleFavoriteSchool {
  readonly type: 'TOGGLE_FAVORITE_SCHOOL'
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
| ToggleFavoriteSchool
| SetUserDataError
