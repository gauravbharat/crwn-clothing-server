import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const shopSelector = state => state.shop;

export const shopCollectionsSelector = createSelector(
  [shopSelector],
  shop => shop.collections
);

export const collectionsForPreviewSelector = createSelector(
  [shopCollectionsSelector],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

/** Memoize/Cache the return of this function for the dynamic argument 'collectionUrlParam'
 * If the function is called again with the same 'collectionUrlParam', the function won't be re-run
 * again and would return the last cached values */
export const collectionSelector = memoize(collectionUrlParam =>
  createSelector([shopCollectionsSelector], collections =>
    collections ? collections[collectionUrlParam] : null
  )
);
