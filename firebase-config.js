// this file is used in gatsby-node.js to generate pages from db
const firebase = require('firebase/compat/app');
require('firebase/compat/analytics');
require('firebase/compat/database');
require('firebase/auth');
require('dotenv').config();

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

const DatabaseRef = firebase.database().ref();
//const auth = firebase.auth();

module.exports = { DatabaseRef, firebase };