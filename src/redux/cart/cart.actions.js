import { CartActionTypes as CAT } from './cart.types';

export const toggleCartHidden = () => ({ type: CAT.TOGGLE_CART_HIDDEN });

export const addCartItem = item => ({
  type: CAT.ADD_CART_ITEM,
  payload: item
});

export const removeCartItem = item => ({
  type: CAT.REMOVE_CART_ITEM,
  payload: item
});

export const clearCartItem = item => ({
  type: CAT.CLEAR_CART_ITEM,
  payload: item
});
