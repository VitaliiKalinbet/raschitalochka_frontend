/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/allReducers';

const rootPersistConfig = {
  key: 'root',
  storage
};
// const DevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(thunk));
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
export default store;
