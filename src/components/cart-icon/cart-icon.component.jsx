import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { cartItemsCountSelector } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
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
const mapStateToProps = state => ({
  itemCount: cartItemsCountSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
