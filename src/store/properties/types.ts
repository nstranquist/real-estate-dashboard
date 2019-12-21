
import { Property } from '../../types'

export interface PropertiesState {
  properties: Property[]
  filter: string
  loading: boolean
  errors: any
}

// Property CRUD
export interface getProperties {
  readonly type: 'GET_PROPERTIES'
  properties: Property[]
}
export interface addProperty {
  readonly type: 'ADD_PROPERTY'
  property: Property
}
export interface updateProperty {
  readonly type: 'UPDATE_PROPERTY'
  property: Property
}
export interface deleteProperty {
  readonly type: 'DELETE_PROPERTY'
  id: string
}

export interface setPropertiesFilter {
  readonly type: 'SET_PROPERTIES_FILTER'
  filter: string
}

// export interface toggleFavoriteProperty {
//   readonly type: 'TOGGLE_FAVORITE_PROPERTY'
//   id: string
// }

export type PropertyActionTypes = 
  | getProperties
  | addProperty
  | updateProperty
  | deleteProperty
  | setPropertiesFilter
  | { readonly type: 'SET_PROPERTIES_ERROR', err: any }
  | { readonly type: 'LOADING_PROPERTIES' }
  // | toggleFavoriteProperty