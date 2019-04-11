import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser, getToken } from '../redux/reducers/session/sessionSelectors';
import * as financeOperations from '../redux/reducers/finance/financeOperations';

const withRequest = WrappedComponent => {
  class WithRequest extends Component {
    componentDidMount() {
      const { user, token, history, getUserFinance } = this.props;

      if (!user) return history.push('/login');
      return getUserFinance(user.id, token);
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  const mstp = state => ({
    user: getUser(state),
    token: getToken(state)
  });

  const mdtp = {
    getUserFinance: financeOperations.getUserFinance
  };

  WithRequest.defaultProps = {
    user: null,
    token: null
  };

  WithRequest.propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    }),
    token: PropTypes.string,
    getUserFinance: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  return connect(
    mstp,
    mdtp
  )(WithRequest);
};

export default withRequest;
