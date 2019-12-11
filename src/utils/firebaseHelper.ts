import * as firebase from "firebase";
import { firebaseConfig } from './firebaseConfig'

export const initializeDefaultFirebaseApp = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  }
}

initializeDefaultFirebaseApp()

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage().ref()
//export const functions = firebase.functions()