import { auth, firestore } from '../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { Investor } from '../../types'

export const getInvestors = () => (dispatch: Dispatch,  getState: any) => {
  console.log('dispatching getInvestors')
  dispatch({ type: 'LOADING_INVESTORS' })
  firestore
    .collection(`/profiles/${auth.currentUser!.uid}/investors`)
    //.orderBy('index')
    .limit(20)
    .get()
    .then((snap) => {
      let investors: Investor[] = snap.docs.map(investor => ({
        id: investor.id,
        firstName: investor.data()!.firstName,
        lastName: investor.data()!.lastName,
        // email: investor.data()!.email,
        companyName: investor.data()!.companyName,
        // officePhone: investor.data()!.officePhone,
        // cellPhone: investor.data()!.cellPhone,
        // address: investor.data()!.address,
        // city: investor.data()!.city,
        // state: investor.data()!.state,
        // zipcode: investor.data()!.zipcode,
        // role: investor.data()!.role,
        priceMin: investor.data()!.priceMin,
        priceMax: investor.data()!.priceMax,
        noiMin: investor.data()!.noiMin,
        noiMax: investor.data()!.noiMax,
        propertyTypes: investor.data()!.propertyTypes,
        builtBefore: investor.data()!.builtBefore,
        builtAfter: investor.data()!.builtAfter,
        states: investor.data()!.states,
        cities: investor.data()!.cities,
        // leaseType: investor.data()!.leaseTypes,
        // propertyStatus: investor.data()!.propertyStatus,
        // is1031: investor.data()!.is1031,
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
}

export const updateInvestor = (investor: Investor) => (dispatch: Dispatch) => {
  console.log('investor to update:', investor)
  firestore
    .doc(`profiles/${auth.currentUser!.uid}/investors/${investor.id}`)
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
}

export const deleteInvestor = (id: string) => (dispatch: Dispatch) => {
  console.log('investor id to delete:', id)
  firestore
    .doc(`profiles/${auth.currentUser!.uid}/investors/${id}`)
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