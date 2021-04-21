import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import { auth, alert, loader, toast } from '../modules';

const config = {
  key: 'LIFTED_REDUX_STORE',
  storage: storage,
  blacklist: ['alert', 'loader', 'toast']
};

const appReducer = persistCombineReducers(config, {
  auth,
  alert,
  loader,
  toast
});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
