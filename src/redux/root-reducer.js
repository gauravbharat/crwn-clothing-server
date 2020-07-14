import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

/** Pass in the reducer we want to persist, i.e. the cart reducer in this case
 * User reducer persistance is already handled by firebase
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

/** Use persistReducer HOC to return modified version of rootReducer with persistence capabilities */
export default persistReducer(persistConfig, rootReducer);
