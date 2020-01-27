import { Dispatch } from 'redux'
import { firestore } from '../../utils/firebaseHelper'
import { Property } from '../../types'

// Property Types
export interface PropertiesState {
  properties: Property[]
  filter: string
  params: string[]
  loading: boolean
  errors: any
}

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
export interface setPropertiesMatch {
  readonly type: 'SET_PROPERTY_MATCH'
  params: string[]
}

export type PropertyActionTypes = 
  | getProperties
  | addProperty
  | updateProperty
  | deleteProperty
  | setPropertiesFilter
  | setPropertiesMatch
  | { readonly type: 'SET_PROPERTIES_ERROR', err: any }
  | { readonly type: 'LOADING_PROPERTIES' }


// Property Actions
export const getProperties = () => (dispatch: Dispatch,  getState: any) => {
  console.log('dispatching getProperties')
  dispatch({ type: 'LOADING_PROPERTIES' })
  firestore
    .collection(`demoProperties`)
    //.orderBy('index')
    .limit(100)
    .get()
    .then((snap) => {
      let properties: Property[] = snap.docs.map(property => ({
        id: property.id,
        name: property.data()!.propertyName,
        propertyType: property.data()!.propType,
        address: property.data()!.address,
        city: property.data()!.city,
        state: property.data()!.state,
        tenancy: property.data()!.tenancy,
        leaseTerm: property.data()!.leaseTerm,
        termRemaining: property.data()!.termRemaining,
        SqFt: property.data()!.SqFt,
        dollarPerSF: property.data()!.dollarPerSF,
        noi: property.data()!.noi,
        capRate: property.data()!.capRate,
        price: property.data()!.price,
        yearBuilt: property.data()!.yearBuilt,
        occupancy: property.data()!.occupancy, // percent
      }))
      
      dispatch({
        type: 'GET_PROPERTIES',
        properties
      })
    })
    .catch(err => dispatch({ type: 'SET_PROPERTIES_ERROR', err}))
}

export const addProperty = (property: Property) => (dispatch: Dispatch) => {
  console.log('property to add:', property)
  // will have to not require id for 'Property' type
  firestore
    .collection('demoProperties')
    .add(property)
    .then(() => {
      console.log('property added successfully. property added was:', property)
    })
    .catch((err: any) => {
      console.log('error adding property:', err)
      dispatch({ type: 'SET_PROPERTIES_ERROR', err })
    })
}

export const updateProperty = (property: Property) => (dispatch: Dispatch) => {
  console.log('property to update:', property)
  firestore
    // .doc(`profiles/${auth.currentUser!.uid}/properties/${property.id}`)
    .doc(`demoProperties/${property.id}`)
    .update({
      ...property
    })
    .then(() => {
      console.log('update successful!')
      // update from store
      dispatch({
        type: 'UPDATE_PROPERTY',
        property
      })
    })
    .catch((err: any) => {
      console.log('error updating property:', err)
      dispatch({ type: 'SET_PROPERTIES_ERROR', err })
    })
}

export const deleteProperty = (id: string) => (dispatch: Dispatch) => {
  console.log('property id to delete:', id)
  firestore
    // .doc(`profiles/${auth.currentUser!.uid}/properties/${id}`)
    .doc(`demoProperties/${id}`)
    .delete()
    .then(() => {
      console.log('delete successful')
      dispatch({ type: 'DELETE_PROPERTY', id})
    })
    .catch(err => dispatch({ type: 'SET_PROPERTY_ERROR', err}))
}

export const uploadProperties = (data: any) => (dispatch: Dispatch) => {
  console.log('upload properties with data:', data)
}

export const setPropertiesFilter = (filter: string) => ({
  type: 'SET_PROPERTIES_FILTER',
  filter
})

export const getAllProperties = () => (dispatch: Dispatch,  getState: any) => {
  console.log('dispatching getProperties')
  dispatch({ type: 'LOADING_PROPERTIES' })
  firestore
    .collection(`demoProperties`)
    //.orderBy('index')
    // .limit(100)
    .get()
    .then((snap) => {
      let properties: Property[] = snap.docs.map(property => ({
        id: property.id,
        name: property.data()!.propertyName,
        propertyType: property.data()!.propType,
        address: property.data()!.address,
        city: property.data()!.city,
        state: property.data()!.state,
        tenancy: property.data()!.tenancy,
        leaseTerm: property.data()!.leaseTerm,
        termRemaining: property.data()!.termRemaining,
        SqFt: property.data()!.SqFt,
        dollarPerSF: property.data()!.dollarPerSF,
        noi: property.data()!.noi,
        capRate: property.data()!.capRate,
        price: property.data()!.price,
        yearBuilt: property.data()!.yearBuilt,
        occupancy: property.data()!.occupancy, // percent
      }))
      
      dispatch({
        type: 'GET_PROPERTIES',
        properties
      })
    })
    .catch(err => dispatch({ type: 'SET_PROPERTIES_ERROR', err}))
}


// Property Reducer
const initialState: PropertiesState = {
  properties: [],
  filter: 'all',
  params: ['price'], // same as filter tho?? is this needed if using selector??
  loading: false,
  errors: null
}

export default (
  state = initialState,
  action: PropertyActionTypes
): PropertiesState => {
  switch (action.type) {
    case 'LOADING_PROPERTIES':
      return {
        ...state,
        loading: true
      }
    case 'GET_PROPERTIES':
      console.log('reduced getProperties')
      return {
        ...state,
        properties: action.properties,
        loading: false,
        errors: null
      }
    case 'ADD_PROPERTY':
      return {
        ...state,
        properties: state.properties.concat(action.property)
      }
    case 'UPDATE_PROPERTY':
      const newProperties = state.properties.map(property => {
        if(property.id === action.property.id) {
          property = action.property
        }
        return property
      })
      return {
        ...state,
        properties: newProperties
      }
    case 'DELETE_PROPERTY':
      return {
        ...state,
        properties: state.properties.filter(property => property.id !== action.id)
      }
    case 'SET_PROPERTIES_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    case 'SET_PROPERTY_MATCH':
      return {
        ...state,
        params: action.params
      }
    case 'SET_PROPERTIES_ERROR':
      return {
        ...state,
        errors: action.err,
        loading: false
      }
    default:
      return state
  }
}