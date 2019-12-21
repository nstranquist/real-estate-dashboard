import { PropertiesState, PropertyActionTypes } from './types'

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
    //     if(property.index === action.index)
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
