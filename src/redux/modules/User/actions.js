export const actionTypes = {
  SIGN_UP_REQUEST: 'session/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'session/SIGN_UP_SUCCESS',
  SIGN_UP_ERROR: 'session/SIGN_UP_ERROR',
  SIGN_IN_REQUEST: 'session/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'session/SIGN_IN_SUCCESS',
  SIGN_IN_ERROR: 'session/SIGN_IN_ERROR',
  SIGN_OUT_REQUEST: 'session/SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS: 'session/SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR: 'session/SIGN_OUT_ERROR',
  REFRESH_CURRENT_USER_START: 'session/REFRESH_CURRENT_USER_START',
  REFRESH_CURRENT_USER_SUCCESS: 'session/REFRESH_CURRENT_USER_SUCCESS'
};

export const signOutRequest = () => ({
  type: actionTypes.SIGN_UP_REQUEST
});

export const signOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS
});
