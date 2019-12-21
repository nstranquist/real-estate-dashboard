import { auth, firestore } from '../../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { CreateProfileForm, ISignUpForm } from '../../../types'

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
export const attemptSignup = (userSignUp: ISignUpForm) => (dispatch: Dispatch, getState: any) => {
  if(getState().profile.auth.isAuthenticated) {
    console.log('You are already logged in. Stop.')
    return
  }
  const { firstName, lastName, email, companyName, phone, role, password } = userSignUp
  dispatch({ type: 'LOADING_AUTH' })

  // TODO: return with success boolean flag
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCreds) => {
      console.log('signup successful with data: ', userCreds)
      // dispatch({ type: 'AUTHENTICATE' })

      // set token?
      // create /profiles in collection
      const profileRef = firestore.doc(`/profiles/${userCreds.user!.uid}/`)
      profileRef
        .set({
          uid: userCreds.user!.uid,
          firstName,
          lastName,
          email: userCreds.user!.email,
          companyName,
          phone,
          role
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log('signup failed: ', err)
      dispatch({ type: 'SET_AUTH_ERROR', err })
    })
}

// export const attemptCreateProfile = (profileData: CreateProfileForm) => (dispatch: Dispatch) => {
//   // update account with second round of survey data
  
// }
export const attemptUpdateAccount = (profileData: CreateProfileForm) => (dispatch: Dispatch) => {
  // update account with second round of survey data

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