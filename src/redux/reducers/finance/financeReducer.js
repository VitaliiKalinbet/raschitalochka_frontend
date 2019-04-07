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

// const getTotal = (state = null, { type, payload }) => {
//   switch (type) {
//     case actionTypes.TOTAL_BALANCE_FETCH_SUCCESS:
//     case actionTypes.TYPE_TOTAL_BALANCE_FETCH_SUCCESS:
//     case actionTypes.TOTAL_INCOME_FETCH_SUCCESS:
//     case actionTypes.TOTAL_COST_FETCH_SUCCESS:
//       return payload;

//     case actionTypes.TOTAL_BALANCE_FETCH_ERROR:
//     case actionTypes.TYPE_TOTAL_BALANCE_FETCH_ERROR:
//     case actionTypes.TOTAL_INCOME_FETCH_ERROR:
//     case actionTypes.TOTAL_COST_FETCH_ERROR:
//       return null;

//     default:
//       return state;
//   }
// };

const totalBalance = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.TOTAL_BALANCE_FETCH_SUCCESS:
      return payload;

    case actionTypes.TOTAL_BALANCE_FETCH_ERROR:
      return null;

    default:
      return state;
  }
};

const typeTotalBalance = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.TYPE_TOTAL_BALANCE_FETCH_SUCCESS:
      return payload;

    case actionTypes.TYPE_TOTAL_BALANCE_FETCH_ERROR:
      return null;

    default:
      return state;
  }
};

// const TotalCost = (state = null, { type, payload }) => {
//   switch (type) {
//     case actionTypes.TYPE_TOTAL_BALANCE_FETCH_SUCCESS:
//       return payload;

//     case actionTypes.TYPE_TOTAL_BALANCE_FETCH_ERROR:
//       return null;

//     default:
//       return state;
//   }
// };

export default combineReducers({
  data,
  totalBalance,
  typeTotalBalance
});
