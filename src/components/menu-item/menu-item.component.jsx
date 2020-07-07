import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => {
        console.log(match);
        return history.push(`${match.url}${linkUrl}`);
      }}
    >
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};

/** withRouter is a Higher-Order Component (HOC)
 * basically a function which takes a component as an argument, transforms it into
 * another component and returns back that modified component. It has now access to the
 * history, match and location (hml) props passed to its top ancestor. The top ancestor, passed inside
 * Route component, is the only one access to the hml props.
 */
export default withRouter(MenuItem);
