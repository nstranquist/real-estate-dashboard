
import { Property } from '../../types'

export interface PropertiesState {
  properties: Property[]
  filter: string
  loading: boolean
  errors: any
}

export interface getProperties {
  readonly type: 'GET_PROPERTIES'
  properties: Property[]
}
export interface setPropertiesFilter {
  readonly type: 'SET_PROPERTIES_FILTER'
  filter: string
}
export interface toggleFavoriteProperty {
  readonly type: 'TOGGLE_FAVORITE_PROPERTY'
  index: number
}
export interface setPropertiesError {
  readonly type: 'SET_PROPERTIES_ERROR'
  err: any
}

export type PropertyActionTypes = 
  | getProperties
  | setPropertiesError
  | toggleFavoriteProperty
  | setPropertiesFilter
  | { type: 'LOADING_PROPERTIES' }