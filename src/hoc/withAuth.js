import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as operotions from '../redux/reducers/session/sessionOperations';
import { getIsAuthenticated, getUser } from '../redux/reducers/session/sessionSelectors';

const withAuth = WrappedComponent => {
  class WithAuth extends Component {
    componentDidUpdate() {
      console.log('WrappedComponent: ', WrappedComponent.props);
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
      console.log(WrappedComponent.props);
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
