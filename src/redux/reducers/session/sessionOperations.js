import axios from 'axios';

import { getToken } from './sessionSelectors';
import { loginRequest, loginSuccess, loginError, logoutRequest, logoutSuccess, logoutError } from './sessionActions';

export const setBaseURL = () => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = 'https://rashchitalochka.vbguard.dev';
};

// export const setBaseURLforLogout = () => {
//   axios.defaults.headers.post['Content-Type'] = 'application/json';
//   axios.defaults.baseURL = 'https://rashchitalochka.vbguard.dev';
// };

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const login = credentials => dispatch => {
  dispatch(loginRequest());
  setBaseURL();

  axios
    .post('/api/login', credentials)
    .then(({ data }) => {
      setAuthHeader(data.token);
      dispatch(loginSuccess(data));
    })
    .catch(error => dispatch(loginError(error)));
};

export const logout = () => (dispatch, getState) => {
  dispatch(logoutRequest());

  const token = getToken(getState());

  const config = {
    headers: {
      Authorization: token
    }
  };
  setBaseURL();
  // setAuthHeader(token);
  axios
    .get('/api/logout', {}, config)
    .then(res => {
      console.log(res);
      return dispatch(logoutSuccess());
    })
    .catch(error => logoutError(error));
};
