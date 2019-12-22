import { PropertiesState, PropertyActionTypes } from './types'
import { Property } from '../../types'

const initialState: PropertiesState = {
  properties: [],
  filter: 'all',
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
      // NOTE: shallow copy errors possible here
      let newPropertiesAdd: Property[] = [...state.properties]
      newPropertiesAdd.push(action.property)
      console.log('new properties after add:', newPropertiesAdd)
      return {
        ...state,
        properties: newPropertiesAdd
      }
    case 'UPDATE_PROPERTY':
      let newPropertiesUpdate = [...state.properties]
      let index = newPropertiesUpdate.findIndex(property => property.id === action.property.id)
      newPropertiesUpdate[index] = action.property
      console.log('new properties after edit:', newPropertiesUpdate)
      return {
        ...state,
        properties: newPropertiesUpdate
      }
    case 'DELETE_PROPERTY':
      let newPropertiesDelete= [...state.properties]
      let propertyIndex = newPropertiesDelete.findIndex(property => property.id === action.id)
      newPropertiesDelete.splice(propertyIndex, 1)
      console.log('new properties after delete:', newPropertiesDelete)
      return {
        ...state,
        properties: newPropertiesDelete
      }
    case 'SET_PROPERTIES_FILTER':
      return {
        ...state,
        properties: [ // spread operator is only a shallow operation
          ...state.properties
        ],
        filter: action.filter
      }
    // case 'TOGGLE_FAVORITE_PROPERTY':
    //   // find property in array by id that needs to be toggled
    //   const newProperties = state.properties.map(property => {
    //     if(property.id === action.id)
    //       property.isFavorite = !property.isFavorite  //toggles property
    //     return property
    //   })
    //   return {
    //     ...state,
    //     properties: newProperties
    //   }
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

// LOCAL SELECTORS:
// export const selectProperty = (state: PropertiesState) => {

// }