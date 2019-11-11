import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAAWe6ePqRa0SdoLJxVaGKiXOdK8MHgQ4s",
  authDomain: "jacobs-dashboard.firebaseapp.com",
  databaseURL: "https://jacobs-dashboard.firebaseio.com",
  projectId: "jacobs-dashboard",
  storageBucket: "jacobs-dashboard.appspot.com",
  messagingSenderId: "436395913903",
  appId: "1:436395913903:web:db0f2e73a6fdb7769fda5a",
  measurementId: "G-3GH9T6Z3JS"
};

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
//export const functions = firebase.functions()