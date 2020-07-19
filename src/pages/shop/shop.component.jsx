import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinnerHOC from '../../components/with-spinner-HOC/with-spinner.component';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

/** 07192020 - Instead of passing the 'component' inside Route, render the modified components
 * passing the loading state
 * Explicitly pass the (match, location and history) props to the modified component in the 'render' property,
 * since Route passed them implicitly to the 'component' property */
const CollectionsOverviewWithSpinner = WithSpinnerHOC(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinnerHOC(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    /** Whenever the collectionRef updates OR when the code is run for the first time,
     * this collectionRef would send us the SnapShot representing the code of our collection's snapshot array
     * at the time when this code renders */
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
      await updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionsPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
