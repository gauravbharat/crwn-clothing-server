import { CartActionTypes as CAT } from './cart.types';

export const toggleCartHidden = () => ({ type: CAT.TOGGLE_CART_HIDDEN });

export const addCartItem = newCartItem => ({
  type: CAT.ADD_CART_ITEM,
  payload: newCartItem
});
