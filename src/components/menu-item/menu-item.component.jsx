import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  TitleHeader,
  SubtitleContainer
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    <MenuItemContainer
      size={size}
      onClick={() => {
        return history.push(`${match.url}${linkUrl}`);
      }}
    >
      <BackgroundImageContainer
        className='background-image'
        imageUrl={imageUrl}
      />
      <ContentContainer className='content'>
        <TitleHeader>{title.toUpperCase()}</TitleHeader>
        <SubtitleContainer>SHOP NOW</SubtitleContainer>
      </ContentContainer>
    </MenuItemContainer>
  );
};

/** withRouter is a Higher-Order Component (HOC)
 * basically a function which takes a component as an argument, transforms it into
 * another component and returns back that modified component. It has now access to the
 * history, match and location (hml) props passed to its top ancestor. The top ancestor, passed inside
 * Route component, is the only one access to the hml props.
 */
export default withRouter(MenuItem);
