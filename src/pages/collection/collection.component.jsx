import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { collectionSelector } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';

import {
  CollectionPageContainer,
  TitleHeading,
  ItemsContainer
} from './collection.styles';

const CollectionPage = ({ collection, collectionId }) => {
  if (!collection) {
    const passedParam = collectionId ? collectionId : '';
    return <Redirect to={`/${passedParam}`} />;
  }

  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <TitleHeading>{title}</TitleHeading>
      {/* Setting property on CollectionItem did not work in this context, so passed the desired CSS property and its value as a prop and handled it in collection-item component and its style */}
      <ItemsContainer>
        {items.map(item => (
          <CollectionItem
            key={item.id}
            item={item}
            extendedProps={'margin-bottom: 30px;'}
          />
        ))}
      </ItemsContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: collectionSelector(ownProps.match.params.collectionId)(state),
  collectionId: ownProps.match.params.collectionId
});

export default connect(mapStateToProps)(CollectionPage);
