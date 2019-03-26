import { combineReducers } from 'redux';

import * as actionTypes from './sessionActionsTypes';

const user = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return payload.user;

    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGOUT_SUCCESS:
      return null;

    default:
      return state;
  }
};
const token = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_SUCCESS:
      return payload.token;

    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGOUT_SUCCESS:
      return null;

    default:
      return state;
  }
};

const isAuthenticated = (state = false, { type }) => {
  switch (type) {
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return true;

    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  token,
  isAuthenticated
});
