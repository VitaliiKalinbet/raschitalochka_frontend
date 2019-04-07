import * as actionTypes from './financeActionsTypes';

export const financeRequest = () => ({
  type: actionTypes.FINANCE_FETCH_REQUEST
});

export const financeSuccess = data => ({
  type: actionTypes.FINANCE_FETCH_SUCCESS,
  payload: data
});

export const financeError = error => ({
  type: actionTypes.FINANCE_FETCH_ERROR,
  payload: {
    error
  }
});
