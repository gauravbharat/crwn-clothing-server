import React from 'react';
import { createStructuredSelector } from 'reselect';

// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { cartItemsCountSelector } from '../../redux/cart/cart.selectors';

import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer
} from './cart-icon.styles';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  return (
    <CartIconContainer onClick={toggleCartHidden}>
      <ShoppingIconContainer />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

/** Instead of directly passing the value of state.cart.cartItems.reduce() to itemCount,
 * a whole reducer 'state' is passed in the selector and
 * the selector is assigned to itemCount which memoizes the last action/count.
 * Thus,
 */
const mapStateToProps = createStructuredSelector({
  itemCount: cartItemsCountSelector
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
