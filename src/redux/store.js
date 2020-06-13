import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out
import {loginReducer} from './reducer';
import sessionReducer from '../reducers/session';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  sessionReducer: sessionReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
