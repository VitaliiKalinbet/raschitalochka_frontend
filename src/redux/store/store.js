/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducers';

const rootPersistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
export default store;
