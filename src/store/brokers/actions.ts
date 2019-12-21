import { auth, firestore } from '../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { Broker } from '../../types'

export const getBrokers = () => (dispatch: Dispatch,  getState: any) => {
  console.log('dispatching getBrokers')
  dispatch({ type: 'LOADING_BROKERS' })
  firestore
    .collection(`/profiles/${auth.currentUser!.uid}/brokers`)
    //.orderBy('index')
    .limit(20)
    .get()
    .then((snap) => {
      let brokers: Broker[] = snap.docs.map(broker => ({
        id: broker.id,
        firstName: broker.data()!.firstName,
        lastName: broker.data()!.lastName,
        email: broker.data()!.email,
        officePhone: broker.data()!.officePhone,
        cellPhone: broker.data()!.cellPhone,
        companyName: broker.data()!.companyName,
        propertyType: broker.data()!.propertyType,
        city: broker.data()!.city,
        state: broker.data()!.state,
        type: broker.data()!.type,
      }))
      dispatch({
        type: 'GET_BROKERS',
        brokers
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: 'SET_BROKERS_ERROR', err})
    })
}

export const addBroker = (broker: Broker) => (dispatch: Dispatch) => {
  console.log('broker to add:', broker)
  // will have to not require id for 'Broker' type
}

export const updateBroker = (broker: Broker) => (dispatch: Dispatch) => {
  console.log('Broker to update:', broker)
  firestore
    .doc(`profiles/${auth.currentUser!.uid}/brokers/${broker.id}`)
    .update({
      ...broker
    })
    .then(() => {
      console.log('update successful!')
      // update from store
      dispatch({
        type: 'UPDATE_BROKER',
        broker
      })
    })
}

export const deleteBroker = (id: string) => (dispatch: Dispatch) => {
  console.log('broker id to delete:', id)
  firestore
    .doc(`profiles/${auth.currentUser!.uid}/brokers/${id}`)
    .delete()
    .then(() => {
      console.log('delete successful')
      dispatch({ type: 'DELETE_BROKER', id})
    })
    .catch(err => dispatch({ type: 'SET_BROKER_ERROR', err}))
}

// export const setPropertiesFilter = (filter: string) => ({
//   type: 'SET_BROKERS_FILTER',
//   filter
// })