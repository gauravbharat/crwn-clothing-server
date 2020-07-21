import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isCollectionFetchingSelector } from '../../redux/shop/shop.selectors';
import WithSpinnerHOC from '../with-spinner-HOC/with-spinner.component';
import CollectionsOverview from '../collections-overview/collections-overview.component';

// Match the prop name passed to CollectionsOverview inside the Shop component
const mapStateToProps = createStructuredSelector({
  isLoading: isCollectionFetchingSelector,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinnerHOC
)(CollectionsOverview);

// const CollectionsOverviewContainer = connect(mapStateToProps)(
//   WithSpinnerHOC(CollectionsOverview)
// );

export default CollectionsOverviewContainer;
