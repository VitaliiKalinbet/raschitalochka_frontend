import axios from 'axios';

import { setBaseURL } from '../redux/reducers/session/sessionOperations';

const register = async credentials => {
  setBaseURL();
  const response = axios.post('/api/register', credentials);
  return response;
};

export default register;
