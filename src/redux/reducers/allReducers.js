import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// тут импортируем все нужные нам редюсеры
import sessionReducer from './session/sessionReducer';

const sessionPersistConfig = {
  key: 'session',
  storage,
  whitelist: ['token']
};

const rootReducer = combineReducers({
  // тут используем подключенные редюсеры
  session: persistReducer(sessionPersistConfig, sessionReducer)
});

export default rootReducer;
