import {createStore, combineReducers} from 'redux';
import sessionReducer from '../reducers/session';
import cartItems from '../reducers/cartItems';
import dollarPriceReducer from '../reducers/dollarPrice';

const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartItems,
  dollarPrice: dollarPriceReducer,
});

export const store = createStore(rootReducer);
