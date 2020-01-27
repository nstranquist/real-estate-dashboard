
import { Dispatch } from 'redux'
import { firestore } from '../../utils/firebaseHelper'
import { Investor } from '../../types'

// Investor Types
export interface InvestorsState {
  investors: Investor[]
  filter: string
  params: string[]
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
export interface setInvestorMatch {
  readonly type: 'SET_INVESTOR_MATCH'
  params: string[]
}

export type InvestorActionTypes = 
  | getInvestors
  | addInvestor
  | updateInvestor
  | deleteInvestor
  | setInvestorsFilter
  | setInvestorMatch
  | { readonly type: 'SET_INVESTORS_ERROR', err: any }
  | { readonly type: 'LOADING_INVESTORS' }


// Investor Actions
export const getInvestors = () => (dispatch: Dispatch, getState: any) => {
  console.log('dispatching getInvestors')
  dispatch({ type: 'LOADING_INVESTORS' })
  firestore
    // .collection(`/profiles/${auth.currentUser!.uid}/investors`)
    .collection('demoInvestors')
    //.orderBy('index')
    .limit(50)
    .get()
    .then((snap) => {
      let investors: Investor[] = snap.docs.map(investor => ({
        id: investor.id,
        firstName: investor.data()!.firstName,
        lastName: investor.data()!.lastName,
        companyName: investor.data()!.companyName,
        email: investor.data()!.email,
        phone: investor.data()!.phone,
        priceMin: investor.data()!.priceMin,
        priceMax: investor.data()!.priceMax,
        noiMin: investor.data()!.noiMin,
        noiMax: investor.data()!.noiMax,
        propertyTypes: investor.data()!.propertyTypes,
        builtBefore: investor.data()!.builtBefore,
        builtAfter: investor.data()!.builtAfter,
        statePreferred: investor.data()!.statePreferred,
        occupancyMin: investor.data()!.occupancyMin,
        sfMin: investor.data()!.sfMin,
        dollarPerSF: investor.data()!.dollarPerSF,
      }))
      dispatch({
        type: 'GET_INVESTORS',
        investors
      })
    })
    .catch(err => dispatch({ type: 'SET_INVESTORS_ERROR', err}))
}

export const addInvestor = (investor: Investor) => (dispatch: Dispatch) => {
  console.log('investor to add:', investor)
  // will have to not require id for 'Investor' type
  firestore
    .collection('demoInvestors')
    .add(investor)
    .then(() => {
      console.log('successfully added investor. investor added:', investor)
    })
    .catch((err: any) => {
      console.log('error adding investor:', err)
      dispatch({ type: 'SET_INVESTORS_ERROR', err })
    })
}

export const updateInvestor = (investor: Investor) => (dispatch: Dispatch) => {
  console.log('investor to update:', investor)
  firestore
    // .doc(`profiles/${auth.currentUser!.uid}/investors/${investor.id}`)
    .doc(`demoInvestors/${investor.id}`)
    .update({
      ...investor
    })
    .then(() => {
      console.log('update successful!')
      // update from store
      dispatch({
        type: 'UPDATE_INVESTOR',
        investor
      })
    })
    .catch((err: any) => {
      console.log("error updating investor:", err)
      dispatch({ type: 'SET_INVESTORS_ERROR', err })
    })
}

export const deleteInvestor = (id: string) => (dispatch: Dispatch) => {
  console.log('investor id to delete:', id)
  firestore
    // .doc(`profiles/${auth.currentUser!.uid}/investors/${id}`)
    .doc(`demoInvestors/${id}`)
    .delete()
    .then(() => {
      console.log('delete successful')
      dispatch({ type: 'DELETE_INVESTOR', id})
    })
    .catch(err => dispatch({ type: 'SET_INVESTORS_ERROR', err}))
}

export const uploadInvestors = (data: any) => (dispatch: Dispatch) => {
  console.log('upload investors with data:', data)
}

export const setInvestorsFilter = (filter: string) => ({
  type: 'SET_INVESTORS_FILTER',
  filter
})

export const getAllInvestors = () => (dispatch: Dispatch, getState: any) => {
  console.log('dispatching getInvestors')
  dispatch({ type: 'LOADING_INVESTORS' })
  firestore
    // .collection(`/profiles/${auth.currentUser!.uid}/investors`)
    .collection('demoInvestors')
    //.orderBy('index')
    // .limit(50)
    .get()
    .then((snap) => {
      let investors: Investor[] = snap.docs.map(investor => ({
        id: investor.id,
        firstName: investor.data()!.firstName,
        lastName: investor.data()!.lastName,
        companyName: investor.data()!.companyName,
        email: investor.data()!.email,
        phone: investor.data()!.phone,
        priceMin: investor.data()!.priceMin,
        priceMax: investor.data()!.priceMax,
        noiMin: investor.data()!.noiMin,
        noiMax: investor.data()!.noiMax,
        propertyTypes: investor.data()!.propertyTypes,
        builtBefore: investor.data()!.builtBefore,
        builtAfter: investor.data()!.builtAfter,
        statePreferred: investor.data()!.statePreferred,
        occupancyMin: investor.data()!.occupancyMin,
        sfMin: investor.data()!.sfMin,
        dollarPerSF: investor.data()!.dollarPerSF,
      }))
      dispatch({
        type: 'GET_INVESTORS',
        investors
      })
    })
    .catch(err => dispatch({ type: 'SET_INVESTORS_ERROR', err}))
}


// Investor Reducer
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
        investors: state.investors.concat(action.investor)
      }
    case 'UPDATE_INVESTOR':
      const newInvestors = state.investors.map(investor => {
        if(investor.id === action.investor.id) {
          investor = action.investor
        }
        return investor
      })
      return {
        ...state,
        investors: newInvestors
      }
    case 'DELETE_INVESTOR':
      return {
        ...state,
        investors: state.investors.filter(investor => investor.id !== action.id)
      }
    case 'SET_INVESTORS_FILTER':
      return {
        ...state,
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