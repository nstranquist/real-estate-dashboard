
import { Broker } from '../../types'

export interface BrokersState {
  brokers: Broker[]
  filter: string
  loading: boolean
  errors: any
}

export interface getBrokers {
  readonly type: 'GET_BROKERS'
  brokers: Broker[]
}
export interface addBroker {
  readonly type: 'ADD_BROKER'
  broker: Broker
}
export interface updateBroker {
  readonly type: 'UPDATE_BROKER'
  broker: Broker
}
export interface deleteBroker {
  readonly type: 'DELETE_BROKER'
  id: string
}

export interface setBrokersFilter {
  readonly type: 'SET_BROKERS_FILTER'
  filter: string
}
// export interface toggleFavoriteBroker {
//   readonly type: 'TOGGLE_FAVORITE_BROKER'
//   index: number
// }

export type BrokerActionTypes = 
  | getBrokers
  | addBroker
  | updateBroker
  | deleteBroker
  | setBrokersFilter
  | { readonly type: 'SET_BROKERS_ERROR', err: any }
  | { readonly type: 'LOADING_BROKERS' }
  // | toggleFavoriteBroker