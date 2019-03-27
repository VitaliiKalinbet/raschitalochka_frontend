import { combineReducers } from 'redux';
import user from '../modules/User/reducer';
// тут импортируем все нужные нам редюсеры

const rootReducer = combineReducers({ user });

export default rootReducer;
