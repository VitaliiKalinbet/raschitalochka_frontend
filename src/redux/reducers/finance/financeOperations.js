import axios from 'axios';

import {
  financeRequest,
  financeSuccess,
  financeError,
  totalBalanceSuccess,
  typeTotalBalanceSuccess,
  addToFinance
} from './financeActions';

import { setBaseURL, setAuthHeader } from '../session/sessionOperations';

export const getUserFinance = (id, token) => dispatch => {
  dispatch(financeRequest());

  setBaseURL();
  setAuthHeader(token);

  axios
    .get(`/api/finance/${id}`)
    .then(({ data }) => {
      dispatch(typeTotalBalanceSuccess(data.finance.typeTotalBalance));
      dispatch(totalBalanceSuccess(data.finance.totalBalance));
      return dispatch(financeSuccess(data.finance.data));
    })
    .catch(error => {
      return dispatch(financeError(error));
    });
};

export const addToData = (obj, type, value) => dispatch => {
  dispatch(addToFinance(obj));
  dispatch(typeTotalBalanceSuccess(type));
  dispatch(totalBalanceSuccess(value));
};
