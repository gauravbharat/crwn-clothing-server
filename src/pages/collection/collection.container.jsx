// Refactored to add an additional layer to handle the redux selectors part and actually render
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isCollectionsLoadedSelector } from '../../redux/shop/shop.selectors';
import WithSpinnerHOC from '../../components/with-spinner-HOC/with-spinner.component';
import CollectionsPage from './collection.component';

// Match the prop name passed to CollectionsOverview inside the Shop component
const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !isCollectionsLoadedSelector(state),
});

const CollectionsPageContainer = compose(
  connect(mapStateToProps),
  WithSpinnerHOC
)(CollectionsPage);

export default CollectionsPageContainer;
