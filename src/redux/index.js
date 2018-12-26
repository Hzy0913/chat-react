import {createStore, applyMiddleware, compose} from 'redux';
import reduxOrder from 'redux-order';
import reducers from './reduces';
import DevTools from './DevTools';

const enhancers = [applyMiddleware(reduxOrder())];

if (__DEVELOPMENT__) {
  enhancers.push(DevTools.instrument());
}
const enhancer = compose(...enhancers);

const store = createStore(
  reducers,
  enhancer
);

export default store;
