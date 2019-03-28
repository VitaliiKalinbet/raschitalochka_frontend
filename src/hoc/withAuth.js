import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import login from '../redux/reducers/session/sessionOperations';
import { getIsAuthenticated } from '../redux/reducers/session/sessionSelectors';

const withAuth = WrappedComponent => {
  class WithAuth extends Component {
    componentDidUpdate() {
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

  WithAuth.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  const mstp = state => ({
    isAuthenticated: getIsAuthenticated(state)
  });

  const mdtp = {
    login
  };
  return connect(
    mstp,
    mdtp
  )(WithAuth);
};

export default withAuth;
