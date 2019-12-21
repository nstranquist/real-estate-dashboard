
import { Investor } from '../../types'

export interface InvestorsState {
  investors: Investor[]
  filter: string
  loading: boolean
  errors: any
}

export interface getInvestors {
  readonly type: 'GET_INVESTORS'
  investors: Investor[]
}
export interface addInvestor {
  readonly type: 'ADD_INVESTOR'
  investor: Investor
}
export interface updateInvestor {
  readonly type: 'UPDATE_INVESTOR'
  investor: Investor
}
export interface deleteInvestor {
  readonly type: 'DELETE_INVESTOR'
  id: string
}

export interface setInvestorsFilter {
  readonly type: 'SET_INVESTORS_FILTER'
  filter: string
}
// export interface toggleFavoriteInvestor {
//   readonly type: 'TOGGLE_FAVORITE_PROPERTY'
//   index: number
// }

export type InvestorActionTypes = 
  | getInvestors
  | addInvestor
  | updateInvestor
  | deleteInvestor
  | setInvestorsFilter
  | { readonly type: 'SET_INVESTORS_ERROR', err: any }
  | { readonly type: 'LOADING_INVESTORS' }
  // | toggleFavoriteInvestor