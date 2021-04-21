import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { compact } from 'lodash';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducerCombiner';
import { __DEV__ } from '../../constants/ApiSettings';

const middlewares = compact([
  thunk.withExtraArgument(),
  __DEV__ ? createLogger() : null,
]);

let debuggWrapper = data => data;
if (__DEV__) {
  debuggWrapper = composeWithDevTools({ realtime: true, port: 8000 });
}

const store = createStore(
  rootReducer,
  {},
  debuggWrapper(compose(applyMiddleware(...middlewares)))
);

export default store;

export const persistor = persistStore(
  store,
  null,
  () => {
    store.getState();
  }
);
