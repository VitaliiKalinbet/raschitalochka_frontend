import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as operotions from '../redux/reducers/session/sessionOperations';
import { getIsAuthenticated, getUser } from '../redux/reducers/session/sessionSelectors';

const withAuth = WrappedComponent => {
  const WithAuth = props => <WrappedComponent {...props} />;

  WithAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  const mstp = state => ({
    isAuthenticated: getIsAuthenticated(state),
    user: getUser(state)
  });

  const mdtp = {
    login: operotions.login,
    logout: operotions.logout
  };
  return connect(
    mstp,
    mdtp
  )(props => <WithAuth {...props} />);
};

export default withAuth;
