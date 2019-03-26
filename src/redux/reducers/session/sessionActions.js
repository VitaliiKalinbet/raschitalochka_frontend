import * as actionTypes from './sessionActionsTypes';

export const authRequest = () => ({
  type: actionTypes.AUTH_REQUEST
});

export const authSuccess = data => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: data
});

export const authError = error => ({
  type: actionTypes.AUTH_ERROR,
  payload: {
    error
  }
});

export const logoutRequest = () => ({
  type: actionTypes.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
});

export const getCurrentUserSuccess = user => ({
  type: actionTypes.GET_CURRENT_USER_SUCCESS,
  payload: { user }
});

export const getCurrentUserRequest = () => ({
  type: actionTypes.GET_CURRENT_USER_REQUEST
});
