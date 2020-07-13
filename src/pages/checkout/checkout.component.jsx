import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
  cartItemsSelector,
  cartTotalSelector
} from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total }) => {
  return (
    <span className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <span className='total'>
        <span>TOTAL: ${total}</span>
      </span>
    </span>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: cartItemsSelector,
  total: cartTotalSelector
});

export default connect(mapStateToProps)(CheckoutPage);
