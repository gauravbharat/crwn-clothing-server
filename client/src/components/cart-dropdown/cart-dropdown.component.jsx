import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { cartItemsSelector } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
  CartDropDownContainer,
  CartItemsContainer,
  MessageContainer
} from './cart-dropdown.styles';

const CartDropDown = ({ cartItems, history, dispatch }) => {
  return (
    <CartDropDownContainer>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <MessageContainer>Your cart is empty</MessageContainer>
        )}
      </CartItemsContainer>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </CartDropDownContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: cartItemsSelector
});

/** If mapDispatchToProps is not passed to connect() method i.e. the 2nd argument/parameter,
 * it passes 'dispatch' as props to the component */
export default withRouter(connect(mapStateToProps)(CartDropDown));
