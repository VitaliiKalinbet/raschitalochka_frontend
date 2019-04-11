import axios from 'axios';

import { getToken } from './sessionSelectors';
import { loginRequest, loginSuccess, loginError, logoutRequest, logoutSuccess, logoutError } from './sessionActions';

export const setBaseURL = () => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.get['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
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
    .then(resp => {
      console.log(resp);
      setAuthHeader(resp.data.token);
      dispatch(loginSuccess(resp.data));
    })
    .catch(error => {
      console.log(error.response.data.message);
      dispatch(loginError(error.response.data.message));
    });
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
    .then(() => {
      return dispatch(logoutSuccess());
    })
    .catch(error => logoutError(error));
};
