/**
 * Configure firebase, and export auth and database utility
 */

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBFdlGs6GZpsx-1MdboQu3t8q8dXzrHz6k',
  authDomain: 'garyd-crwn-db.firebaseapp.com',
  databaseURL: 'https://garyd-crwn-db.firebaseio.com',
  projectId: 'garyd-crwn-db',
  storageBucket: 'garyd-crwn-db.appspot.com',
  messagingSenderId: '305653774286',
  appId: '1:305653774286:web:02ed14c48f358a13355d9f',
  measurementId: 'G-FPQX54RF02'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/**
 * Configure firebase for google oauth login
 */
const provider = new firebase.auth.GoogleAuthProvider();
// Always show the pop-up to select the desired Google account to login
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
