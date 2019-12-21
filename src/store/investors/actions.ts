import { firestore } from '../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { Property } from '../../types'

export const getProperties = () => (dispatch: Dispatch,  getState: any) => {
  console.log('dispatching getProperties')
  dispatch({ type: 'LOADING_PROPERTIES' })
  firestore
    .collection('properties')
    //.orderBy('index')
    .limit(20)
    .get()
    .then((snap) => {
      let properties: Property[] = snap.docs.map(property => ({
        id: property.id,
        address: property.data()!.address,
        price: property.data()!.price,
        capRate: property.data()!.capRate,
        noi: property.data()!.noi,
        propertyType: property.data()!.propertyType,
        yearBuilt: property.data()!.yearBuilt,
      }))
      dispatch({
        type: 'GET_PROPERTIES',
        properties
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: 'SET_PROPERTIES_ERROR', err})
    })
}

export const setPropertiesFilter = (filter: string) => ({
  type: 'SET_PROPERTIES_FILTER',
  filter
})