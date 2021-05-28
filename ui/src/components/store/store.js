/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import reducer from './reducer';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);

export default store;
