import { BrokersState, BrokerActionTypes } from './types'

const initialState: BrokersState = {
  brokers: [],
  filter: 'all',
  loading: false,
  errors: null
}

export default (
  state = initialState,
  action: BrokerActionTypes
): BrokersState => {
  switch (action.type) {
    case 'LOADING_BROKERS':
      return {
        ...state,
        loading: true
      }
    case 'GET_BROKERS':
      console.log('reduced getBrokers')
      return {
        ...state,
        brokers: action.brokers,
        loading: false,
        errors: null
      }
    case 'ADD_BROKER':
      return {
        ...state,

      }
    case 'UPDATE_BROKER':
      return {
        ...state,
        
      }
    case 'DELETE_BROKER':
      return {
        ...state,
        
      }
    case 'SET_BROKERS_FILTER':
      return {
        ...state,
        brokers: [ // spread operator is only a shallow operation
          ...state.brokers
        ],
        filter: action.filter
      }
    // case 'TOGGLE_FAVORITE_PROPERTY':
    //   // find property in array by id that needs to be toggled
    //   const newProperties = state.properties.map(property => {
    //     if(property.id === action.property.id)
    //       property.isFavorite = !property.isFavorite  //toggles property
    //     return property
    //   })
    //   return {
    //     ...state,
    //     properties: newProperties
    //   }
    case 'SET_BROKERS_ERROR':
      return {
        ...state,
        errors: action.err,
        loading: false
      }
    default:
      return state
  }
}
