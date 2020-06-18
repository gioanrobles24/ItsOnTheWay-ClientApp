import {createStore, combineReducers} from 'redux';
import sessionReducer from '../reducers/session';
import cartItems from '../reducers/cartItems';

const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartItems
});

export const store = createStore(rootReducer);
