import * as actionTypes from './sessionActionsTypes';

export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST
});

export const loginSuccess = data => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: data
});

export const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  payload: {
    error
  }
});
