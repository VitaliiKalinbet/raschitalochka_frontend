import { combineReducers } from 'redux';

import * as actionTypes from './financeActionsTypes';

const data = (state = [], { type, payload }) => {
  console.log(type, payload);
  switch (type) {
    case actionTypes.FINANCE_FETCH_SUCCESS:
      return payload;

    case actionTypes.FINANCE_FETCH_ERROR:
      return [];

    default:
      return state;
  }
};

export default combineReducers({
  data
});
