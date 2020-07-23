import { createSelector } from 'reselect';

// INPUT selector
const cartSelector = state => state.cart;

// OUTPUT selector, createSelector creates a memoized selector
export const cartItemsSelector = createSelector(
  [cartSelector],
  cart => cart.cartItems
);

export const cartHiddenSelector = createSelector(
  [cartSelector],
  cart => cart.hidden
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

export const cartTotalSelector = createSelector(
  [cartItemsSelector],
  cartItems =>
    cartItems.reduce(
      (accumulatedTotal, cartItem) =>
        accumulatedTotal + cartItem.quantity * cartItem.price,
      0
    )
);
