import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionsPageContainer from '../collection/collection.container';

// /** 07192020 - Instead of passing the 'component' inside Route, render the modified components
//  * passing the loading state
//  * Explicitly pass the (match, location and history) props to the modified component in the 'render' property,
//  * since Route passed them implicitly to the 'component' property */
// const CollectionsOverviewWithSpinner = WithSpinnerHOC(CollectionOverview);
// const CollectionsPageWithSpinner = WithSpinnerHOC(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          // render={(props) => (
          //   <CollectionsOverviewWithSpinner
          //     isLoading={isCollectionFetching}
          //     {...props}
          //   />
          // )}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionsPageContainer}
          // render={(props) => (
          //   <CollectionsPageWithSpinner
          //     isLoading={!isCollectionsLoaded}
          //     {...props}
          //   />
          // )}
        />
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   isCollectionsLoaded: isCollectionsLoadedSelector,
// });

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
