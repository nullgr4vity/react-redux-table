import { createStore } from 'redux';
import reducers from './../reducers';

export function configureStore(preloadedState = {}) {
  return createStore(
    reducers,
    preloadedState
  );
}