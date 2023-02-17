import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import  firebase from 'firebase/compat/app'
import 'firebase/compat/analytics'
import 'firebase/compat/database'
import 'firebase/auth'
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const Firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const Providers = { google: new GoogleAuthProvider() };

firebase.initializeApp(firebaseConfig);
export default firebase;
