import { auth, firestore } from '../../../utils/firebaseHelper'
import { Dispatch } from 'redux'
//import history from '../../../utils/history'
//import getNotificationToken from '../utils/getNotificationToken'

// auth/user actions
export const attemptLogin = (email: string, password: string) => (dispatch: Dispatch, getState: any) => {
  if(getState().profile.auth.isAuthenticated) {
    console.log('You are already logged in. Stop.')
    return
  }

  dispatch({ type: 'LOADING_AUTH' })
  auth
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      console.log('signin successful with data: ', data)
      dispatch({ type: 'AUTHENTICATE' })
      //history.push('/home')
    })
    .catch((err: any) => {
      console.log('signin error: ', err.message)
      dispatch({ type: 'SET_AUTH_ERROR', err})
    })
}
export const logout = () => (dispatch: Dispatch) => {
  console.log('begin logout')
  auth
    .signOut()
    .then(() => {
      console.log('signout success')
      dispatch({ type: 'UNAUTHENTICATE' })
    })
    .catch(err => console.log('signout error: ', err))
}
export const attemptSignup = (firstName: string, lastName: string, email: string, password: string) => (dispatch: Dispatch, getState: any) => {
  if(getState().profile.auth.isAuthenticated) {
    console.log('You are already logged in. Stop.')
    return
  }
  dispatch({ type: 'LOADING_AUTH' })

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCreds) => {
      console.log('signup successful with data: ', userCreds)
      dispatch({ type: 'AUTHENTICATE' })

      // set token?
      // create /profiles in collection
      const profileRef = firestore.doc(`/profiles/${userCreds.user!.uid}/`)
      profileRef
        .set({
          uid: userCreds.user!.uid,
          firstName,
          lastName,
          email: userCreds.user!.email
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log('signup failed: ', err)
      dispatch({ type: 'SET_AUTH_ERROR', err })
    })
}
export const clearAuthErrors = () => (dispatch: Dispatch) => {
  dispatch({ type: 'CLEAR_AUTH_ERRORS' })
}
export const authenticateUser = () => (dispatch: Dispatch) => {
  dispatch({ type: 'AUTHENTICATE' })
}

/*
const setAuthorizationHeader = (token: string) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
*/