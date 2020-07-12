import {createStore, combineReducers} from 'redux';
import sessionReducer from '../reducers/session';
import cartItems from '../reducers/cartItems';
import dollarPriceReducer from '../reducers/dollarPrice';
import addressReducer from '../reducers/addresses';

const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartItems,
  dollarPrice: dollarPriceReducer,
  addresses: addressReducer,
});

export const store = createStore(rootReducer);
