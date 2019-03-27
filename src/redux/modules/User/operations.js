import axios from 'axios';
import { getToken } from './selectors';
import { signOutRequest, signOutSuccess } from './actions';

axios.defaults.baseURL = 'https://rashchitalochka.vbguard.dev/api';
axios.defaults.headers.put['Content-Type'] = 'applications/json';

// const setAuthHeader = token => {
//   Axios.defaults.headers.common[Authorization] = `Bearer ${token}`;
// };

const clearAuthHeader = () => {
  Axios.defaults.headers.common[Authorization] = null;
};

const signOut = () => (dispatch, getState) => {
  dispatch(signOutRequest());

  const token = getToken(getState());

  const config = {
    headers: {
      Authorization: token
    }
  };

  axios
    .post('/auth/signout', {}, config)
    .then(() => {
      clearAuthHeader();
      localStorage.clear();
      dispatch(signOutSuccess());
    })
    .catch(error => console.log(error));
};

export default { signOut };
