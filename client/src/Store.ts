import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { state } from './reducers';

const a: any = window;
const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk, logger),
  // other store enhancers if any
);

const currentUser = sessionStorage.getItem('currentUser');
const initialState = {
  currentUser: currentUser ? JSON.parse(currentUser) : null
}

export const store: Store<any> = createStore(
  state,
  initialState,
  enhancer
);
