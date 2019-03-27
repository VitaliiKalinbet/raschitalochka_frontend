import axios from 'axios';
import { getToken } from './selectors';
import { signOutRequest, signOutSuccess } from './actions';

axios.defaults.baseURL = 'http://localhost:4040';

// const setAuthHeader = token => {
//   Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   Axios.defaults.headers.common['Authorization'] = null;
// };

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
      // clearAuthHeader();
      dispatch(signOutSuccess());
    })
    .catch(error => console.log(error));
};

export default { signOut };
