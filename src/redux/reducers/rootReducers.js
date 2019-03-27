import { combineReducers } from 'redux';
import { user, token, isAuthenticated } from '../modules/User/reducer';
// тут импортируем все нужные нам редюсеры

const rootReducer = combineReducers({ user, token, isAuthenticated });

export default rootReducer;
