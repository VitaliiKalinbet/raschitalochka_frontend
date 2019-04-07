import { combineReducers } from 'redux';

import * as actionTypes from './financeActionsTypes';

const data = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.FINANCE_FETCH_SUCCESS:
      return payload;

    case actionTypes.FINANCE_FETCH_ERROR:
      return [];

    default:
      return state;
  }
};
const totalBalance = (state = 0, { type, payload }) => {
  switch (type) {
    case actionTypes.TOTAL_BALANCE_FETCH_SUCCESS:
      return payload;

    case actionTypes.TOTAL_BALANCE_FETCH_ERROR:
      return [];

    default:
      return state;
  }
};

export default combineReducers({
  data,
  totalBalance
});
