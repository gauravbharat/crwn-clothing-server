import { createSelector } from 'reselect';

// INPUT selector
const cartSelector = state => state.cart;

// OUTPUT selector, createSelector creates a memoized selector
export const cartItemsSelector = createSelector(
  [cartSelector],
  cart => cart.cartItems
);

export const cartItemsCountSelector = createSelector(
  [cartItemsSelector],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
