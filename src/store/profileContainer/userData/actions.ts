
import { auth, firestore } from '../../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { ProfileData } from '../../../types'


export const getUserData = () => (dispatch: Dispatch) => {
  console.log('get user data in thunk')
  dispatch({ type: 'LOADING_USER_DATA' })

  // TODO: dispose of snapshot listener when necessary
  // const properties = firestore
  //   .collection(`profiles/${auth.currentUser!.uid}/properties`)
  //   .get()
  //   .then((querySnap) => querySnap.docs )
  //   .catch((err) => dispatch({ type: 'SET_USER_DATA_ERROR', err }))

  // const investors = firestore
  //   .collection(`profiles/${auth.currentUser!.uid}/investors`)
  //   .get()
  //   .then((querySnap) => querySnap.docs )
  //   .catch((err) => dispatch({ type: 'SET_USER_DATA_ERROR', err }))

  // const brokers = firestore
  //   .collection(`profiles/${auth.currentUser!.uid}/brokers`)
  //   .get()
  //   .then((querySnap) => querySnap.docs )
  //   .catch((err) => dispatch({ type: 'SET_USER_DATA_ERROR', err }))

  // const userData = {
    
  // }
}

export const getUserProfileData = () => (dispatch: Dispatch) => {
  dispatch({ type: 'LOADING_USER_PROFILE_DATA' })
  firestore
    .doc(`profiles/${auth.currentUser!.uid}`)
    .get()
    .then(doc => {
      console.log('user data:', doc.data())
      dispatch({
        type: 'SET_USER_PROFILE_DATA',
        firstName: doc.data()!.firstName,
        lastName: doc.data()!.lastName,
        email: doc.data()!.email,
        companyName: doc.data()!.companyName,
        phone: doc.data()!.phone,
        role: doc.data()!.role,
      })
    })
    .catch(err => dispatch({ type: 'SET_USER_DATA_ERROR', err }))
}

export const attemptUpdateProfile = (profileData: ProfileData) => (dispatch: Dispatch) => {
  // update account with second round of survey data
  console.log('profile data in thunk to update:', profileData)
  if(auth.currentUser!.uid) {
    dispatch({ type: 'LOADING_USER_PROFILE_DATA' })
    firestore
      .doc(`profiles/${auth.currentUser!.uid}`)
      .update({
        ...profileData
      })
      .then(() => {
        dispatch({
          type: 'SET_USER_PROFILE_DATA',
          ...profileData
        })
      })
      .catch((err) => dispatch({ type: 'SET_USER_DATA_ERROR', err }))
  }
}
