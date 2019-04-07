import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// тут импортируем все нужные нам редюсеры
import sessionReducer from './session/sessionReducer';
import financeReducer from './finance/financeReducer';
// errorReducer,
// loadingReducer,

const sessionPersistConfig = {
  key: 'session',
  storage,
  whitelist: ['token']
};

const financePersistConfig = {
  key: 'finance',
  storage
};

const rootReducer = combineReducers({
  // тут используем подключенные редюсеры
  session: persistReducer(sessionPersistConfig, sessionReducer),
  finance: persistReducer(financePersistConfig, financeReducer)
  // error: errorReducer,
  // loading: loadingReducer
});

export default rootReducer;
