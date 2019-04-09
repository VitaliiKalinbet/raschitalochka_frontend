import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';

import * as financeOperations from '../../redux/reducers/finance/financeOperations';
import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';
import s from './DashboardPage.module.css';

class DashboardPage extends Component {
  // state = {};

  componentDidMount() {
    const { user, token, history, getUserFinance } = this.props;

    if (!user) return history.push('/login');
    return getUserFinance(user.id, token);
  }

  render() {
    return (
      <>
        <Header />
        <div className={s.mainWrapper}>
          <Sidebar />
          <Main />
        </div>
      </>
    );
  }
}

DashboardPage.defaultProps = {
  user: null,
  token: null
};

DashboardPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string
  }),
  token: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getUserFinance: PropTypes.func.isRequired
};

const mstp = state => ({
  user: getUser(state),
  token: getToken(state)
});

const mdtp = {
  getUserFinance: financeOperations.getUserFinance
};

export default connect(
  mstp,
  mdtp
)(DashboardPage);
