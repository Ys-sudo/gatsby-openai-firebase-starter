import  firebase from 'firebase/compat/app'
import 'firebase/compat/analytics'
import 'firebase/compat/database'
import 'firebase/auth'
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };


firebase.initializeApp(config);

export const auth = getAuth();

export const Providers = { google: new GoogleAuthProvider() };


export default firebase;
