import { combineReducers } from 'redux';

import * as actionTypes from './financeActionsTypes';

const data = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.FINANCE_FETCH_SUCCESS:
      return payload;

    case actionTypes.ADD_TO_FINANCE:
      return [...state, payload];

    case actionTypes.FINANCE_FETCH_ERROR:
      return [];

    default:
      return state;
  }
};

const totalBalance = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.TOTAL_BALANCE:
      return payload;

    default:
      return state;
  }
};

const typeTotalBalance = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.TYPE_TOTAL_BALANCE:
      return payload;

    default:
      return state;
  }
};

const loading = (state = false, { type }) => {
  switch (type) {
    case actionTypes.FINANCE_FETCH_REQUEST:
      return true;

    case actionTypes.FINANCE_FETCH_SUCCESS:
    case actionTypes.FINANCE_FETCH_ERROR:
      return false;

    default:
      return state;
  }
};

const error = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.FINANCE_FETCH_REQUEST:
      return null;

    case actionTypes.FINANCE_FETCH_ERROR:
      return payload;

    default:
      return state;
  }
};

export default combineReducers({
  data,
  loading,
  error,
  totalBalance,
  typeTotalBalance
});
