export const isAuthenticated = state => state.session.isAuthenticated;

export const getToken = state => state.session.token;

export const getUser = state => state.session.user;
