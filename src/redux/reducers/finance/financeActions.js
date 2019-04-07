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

export const totalBalanceSuccess = data => ({
  type: actionTypes.TOTAL_BALANCE_FETCH_SUCCESS,
  payload: data
});

export const totalBalanceError = error => ({
  type: actionTypes.TOTAL_BALANCE_FETCH_ERROR,
  payload: {
    error
  }
});
