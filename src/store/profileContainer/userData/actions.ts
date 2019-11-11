
import { auth, firestore } from '../../../utils/firebaseHelper'
import { Dispatch } from 'redux'

//export const getUserProfileData
//export const updateUserProfileData
//export const updateUserPrivateData (backend?)
export const getUserData = () => (dispatch: Dispatch) => {
  console.log('get user data thunk here')
  dispatch({ type: 'LOADING_USER_DATA' })
  firestore
    .doc(`profiles/${auth.currentUser!.uid}`)
    .onSnapshot(doc => {
      console.log('snapshot of userdata:', doc)
      console.log('doc data:', doc.data())
      dispatch({
        type: 'SET_USER_DATA',
        myProperties: doc.data()!.myProperties,
        myInvestors: doc.data()!.myInvestors,
        matchedProperties: doc.data()!.matchedProperties,
        matchedInvestors: doc.data()!.matchedInvestors,
      })
    }, (err) => {
      console.log('error: ', err)
      dispatch({ type: 'SET_USER_DATA_ERROR', err })
    })
}
export const getUserPrivateData = () => (dispatch: Dispatch) => {
  dispatch({ type: 'LOADING_USER_STATIC_DATA' })
  firestore
    .doc(`profiles/${auth.currentUser!.uid}`)
    .get()
    .then(doc => {
      console.log('user data:', doc.data())
      dispatch({
        type: 'SET_USER_PRIVATE_DATA',
        firstName: doc.data()!.firstName,
        lastName: doc.data()!.lastName,
        email: doc.data()!.email,
        company: doc.data()!.company
      })
    })
    .catch(err => {
      dispatch({ type: 'SET_USER_DATA_ERROR', err })
      console.log(err)
    })
}
