import ShopActionTypes from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

// Return Action OBJECT
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

// Return Action OBJECT
export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

// Return Action OBJECT
export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// Return Action FUNCTION, which would be intercepted by Redux Thunk, which works on the action items and
// dispatches the action object to the reducer. Redux Thunk ignores the 'action objects' meant for reducer
// All-n-all what I understood is that, whatever 'action' code we wrote in a component, can now be moved to
// Redux Thunk i.e. action items written in Redux Actions object and is intercepted by Thunk to work on it.
/** If redux-thunk middleware is enabled, any time you attempt to 'dispatch' a function instead of an object,
 * the middleware will call that function with 'dispatch' method itself as the first argument */
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};

// GET DATA PATTERN 3 - Using native Fetch API for API calls provided by firestore
/** 07192020 - Another approach is to use the native Fetch API to use the APIs provided
 * by firestore
 * However, we aren't using it in this case becaues the data returned is very much nested into multiple
 * levels. See the console for the log in the example below */
// fetch('https://firestore.googleapis.com/v1/projects/garyd-crwn-db/databases/(default)/document/collections')
// .then(response => response.json())
// .then(collections => console.log(collections))

//  GET DATA PATTERN 2 - Using Promise based methods provided by firestore
/** 07192020 - Replace the live-stream of updates, provided by firestore using the
 * observable/observer pattern, used promise pattern to one-time get records on each
 * componentDidMount() call */
// collectionRef.get().then(snapshot => {
//   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//   updateCollections(collectionsMap);
//   this.setState({ loading: false });
// });

// GET DATA PATTERN 1 - observable/observer, live-data stream, open-connection listening to update
// events, provided by firestore
// /** Whenever the collectionRef updates OR when the code is run for the first time,
//  * this collectionRef would send us the SnapShot representing the code of our collection's snapshot array
//  * at the time when this code renders */
// collectionRef.onSnapshot(async snapshot => {
//   const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
//   await updateCollections(collectionsMap);
//   this.setState({ loading: false });
// });
