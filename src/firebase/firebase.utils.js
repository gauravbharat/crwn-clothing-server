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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = await firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

/** 07182020 - Upload data on Firebase */

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // Send additions as batch to either 'add all' or 'add none',
  // i.e for the firestore transaction to either 'commit on success' or 'rollback on failure'
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // Create a new doc reference to add records using set() method
    const newDocRef = collectionRef.doc();
    // instead of doc.set() for a single record, use batch.set() for multiple
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

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
