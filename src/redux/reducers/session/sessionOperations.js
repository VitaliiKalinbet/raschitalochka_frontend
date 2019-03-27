import axios from 'axios';

import {
  authRequest,
  authSuccess,
  authError,
  logoutRequest,
  logoutSuccess,
  getCurrentUserRequest,
  getCurrentUserSuccess
} from './sessionActions';

import { getToken } from './sessionSelectors';

const setBaseURL = () => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = 'https://rashchitalochka.vbguard.dev';
};

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = null;
};

export const register = credentials => dispatch => {
  dispatch(authRequest());
  setBaseURL();
  axios
    .post('/auth/signup', credentials)
    .then(({ data }) => {
      setAuthHeader(data.token);
      dispatch(authSuccess(data));
    })
    .catch(error => dispatch(authError(error)));
};

export const login = credentials => dispatch => {
  dispatch(authRequest());
  console.log(credentials);
  setBaseURL();
  console.log(axios.defaults.headers);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOWI5OWNmODk0NjBjNGM5ZmJhY2NjNSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNTUzNzA2NjY3LCJleHAiOjE1NTM3MTY2Njd9.HT7czGsyU6k5RYmAohShvz9858jwCm5SeqazgmVMhIM';
  const user = {
    id: '5c9b99cf89460c4c9fbaccc5',
    email: 'test@test.com',
    name: 'test'
  };

  const data = {
    token,
    user
  };

  // setAuthHeader(token);
  dispatch(authSuccess(data));

  // axios
  //   .post('/api/login', credentials)
  //   .then(({ data }) => {
  //     setAuthHeader(data.token);
  //     dispatch(authSuccess(data));
  //   })
  //   .catch(error => dispatch(authError(error)));
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
  axios.post('/auth/logout', {}, config).then(() => dispatch(logoutSuccess()));
};

export const getCurrentUser = () => (dispatch, getState) => {
  const token = getToken(getState());

  if (!token) return;

  setAuthHeader(token);

  dispatch(getCurrentUserRequest());
  setBaseURL();
  axios
    .get('/auth/current')
    .then(({ data }) => {
      setAuthHeader(token);
      return dispatch(getCurrentUserSuccess(data.user));
    })
    .catch(error => {
      // dispach екшен чтобы убрать токен из state
      clearAuthHeader();
      console.log('Error while refreshing: ', error);
    });
};
