import {createStore, combineReducers} from 'redux';
import sessionReducer from '../reducers/session';
import cartItems from '../reducers/cartItems';
import parametersReducer from '../reducers/parameters';
import addressReducer from '../reducers/addresses';
import segmentsReducer from '../reducers/segments';
import partnerReducer from '../reducers/partner';

const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartItems,
  parameters: parametersReducer,
  addresses: addressReducer,
  segments: segmentsReducer,
  partner: partnerReducer,
});

export const store = createStore(rootReducer);
