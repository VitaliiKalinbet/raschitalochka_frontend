import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';

import { getIsAuthenticated } from '../redux/reducers/session/sessionSelectors';

class App extends Component {
  state = {};

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Router>
          <Route
            exact
            path="/"
            render={() => (isAuthenticated ? <Redirect to="/dashboard/home" /> : <Redirect to="/login" />)}
          />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/dashboard" component={props => <DashboardPage {...props} />} />
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mstp = state => ({
  isAuthenticated: getIsAuthenticated(state)
});

const AppWithAuth = connect(mstp)(App);

export default hot(AppWithAuth);
