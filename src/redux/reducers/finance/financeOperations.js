import axios from 'axios';

import {
  financeRequest,
  financeSuccess,
  financeError,
  totalBalanceSuccess,
  typeTotalBalanceSuccess,
  addToFinance
  // totalBalanceError,
  // typeTotalBalanceError
} from './financeActions';

import { setBaseURL, setAuthHeader } from '../session/sessionOperations';

// export const setBaseURL = () => {
//   axios.defaults.headers.post['Content-Type'] = 'application/json';
//   axios.defaults.headers.get['Content-Type'] = 'application/json';
//   axios.defaults.headers.put['Content-Type'] = 'application/json';
//   axios.defaults.baseURL = 'https://rashchitalochka.vbguard.dev';
// };

// export const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

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
      // dispatch(typeTotalBalanceError(error));
      // dispatch(totalBalanceError(error));
      return dispatch(financeError(error));
    });
};

// setTotalBalance = (type, value) => {
//   console.log(type, value);
//   this.setState({
//     // totalBalance: this.returnValueByType(type, value),
//     // typeOftotalBalance: type
//   });
// };

// export const setTotalBalance = (type, value) => dispatch => {
//   Promise.resolve(() => {
//     dispatch(typeTotalBalanceSuccess(type));
//     dispatch(totalBalanceSuccess(value));
//   });
// };

export const addToData = (obj, type, value) => dispatch => {
  // console.log(data);

  dispatch(addToFinance(obj));
  dispatch(typeTotalBalanceSuccess(type));
  dispatch(totalBalanceSuccess(value));
  // console.log(financeSuccess(data.push(obj)));
  // Promise.resolve(() => dispatch(financeSuccess(data.push(obj))));
};
