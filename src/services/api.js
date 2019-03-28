import axios from 'axios';

import { setBaseURL, setAuthHeader } from '../redux/reducers/session/sessionOperations';

export const register = async credentials => {
  setBaseURL();
  const response = await axios.post('/api/register', credentials);
  return response;
};

export const getFinanceById = async (userId, token) => {
  setBaseURL();
  setAuthHeader(token);
  const response = await axios.post(`/api/finance/${userId}`);
  return response;
  // return response.data;
};
