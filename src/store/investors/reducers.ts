import { InvestorsState, InvestorActionTypes } from './types'

const initialState: InvestorsState = {
  investors: [],
  filter: 'all',
  params: ['price'],
  loading: false,
  errors: null
}

export default (
  state = initialState,
  action: InvestorActionTypes
): InvestorsState => {
  switch (action.type) {
    case 'LOADING_INVESTORS':
      return {
        ...state,
        loading: true
      }
    case 'GET_INVESTORS':
      console.log('reduced getInvestors')
      return {
        ...state,
        investors: action.investors,
        loading: false,
        errors: null
      }
    case 'ADD_INVESTOR':
      return {
        ...state,

      }
    case 'UPDATE_INVESTOR':
      return {
        ...state,
        
      }
    case 'DELETE_INVESTOR':
      return {
        ...state,
        
      }
    case 'SET_INVESTORS_FILTER':
      return {
        ...state,
        investors: [ // spread operator is only a shallow operation
          ...state.investors
        ],
        filter: action.filter
      }
    case 'SET_INVESTOR_MATCH':
      return {
        ...state,
        params: action.params
      }
    case 'SET_INVESTORS_ERROR':
      return {
        ...state,
        errors: action.err,
        loading: false
      }
    default:
      return state
  }
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