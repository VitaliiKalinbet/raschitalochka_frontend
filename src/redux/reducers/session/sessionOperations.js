import axios from 'axios';

import { loginRequest, loginSuccess, loginError } from './sessionActions';

const setBaseURL = () => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = 'https://rashchitalochka.vbguard.dev';
};

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const login = credentials => dispatch => {
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

export default login;
