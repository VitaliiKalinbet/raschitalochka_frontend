import axios from 'axios';

import { financeRequest, financeSuccess, financeError, totalBalanceSuccess, totalBalanceError } from './financeActions';

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

export const gerUserFinance = (id, token) => dispatch => {
  dispatch(financeRequest());
  setBaseURL();
  setAuthHeader(token);

  axios
    .get(`/api/finance/${id}`)
    .then(({ data }) => {
      console.log(data);
      dispatch(totalBalanceSuccess(data.finance.totalBalance));
      return dispatch(financeSuccess(data.finance.data));
    })
    .catch(error => {
      dispatch(totalBalanceError(error));
      return dispatch(financeError(error));
    });
};

export const qwe = {};
