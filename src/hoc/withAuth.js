import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { register, login } from '../redux/reducers/session/sessionOperations';
import { getIsAuthenticated } from '../redux/reducers/session/sessionSelectors';

const withAuth = WrappedComponent => {
  class WithAuth extends Component {
    componentDidUpdate() {
      /* eslint-disable react/prop-types */
      const { isAuthenticated, location, history } = this.props;

      const { from } = location.state || { from: { pathname: '/dashboard/home' } };

      if (isAuthenticated) {
        history.push({
          pathname: from.pathname,
          state: { from: location }
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mstp = state => ({
    isAuthenticated: getIsAuthenticated(state)
  });

  const mdtp = {
    register,
    login
  };
  return connect(
    mstp,
    mdtp
  )(WithAuth);
};

export default withAuth;
