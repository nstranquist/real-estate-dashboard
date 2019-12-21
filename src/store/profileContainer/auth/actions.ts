import { auth, firestore } from '../../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { CreateProfileForm, ISignUpForm, ProfileData } from '../../../types'

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
      // dispatch({ type: 'AUTHENTICATE' }) // uncomment if you want to directly go to dashboard

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
        .then(() => {
          firestore
            .collection(`/profiles/${userCreds.user!.uid}/properties`)
            .add({
              address:'1234 example dr.',
              price: 400000,
              capRate: 20,
              noi: 30000,
              propertyType: 'Retail',
              yearBuilt: 2019
            })
          firestore
            .collection(`/profiles/${userCreds.user!.uid}/investors`)
            .add({
              address:'1234 example dr.',
              price: 400000,
              capRate: 20,
              noi: 30000,
              propertyType: 'Retail',
              yearBuilt: 2019
            })
          firestore
            .collection(`/profiles/${userCreds.user!.uid}/brokers`)
            .add({
              address:'1234 example dr.',
              price: 400000,
              capRate: 20,
              noi: 30000,
              propertyType: 'Retail',
              yearBuilt: 2019
            })
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