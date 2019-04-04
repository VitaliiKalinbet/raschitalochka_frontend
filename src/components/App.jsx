import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';

import { getIsAuthenticated } from '../redux/reducers/session/sessionSelectors';

const App = ({ isAuthenticated }) => (
  <>
    <Router>
      <Route
        exact
        path="/"
        render={() => (isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />)}
      />
      <Route path="/login" component={LoginPage} />
      <Route path="/registration" component={RegistrationPage} />
      <Route path="/dashboard" render={props => <DashboardPage {...props} />} />
      {/* <Route path="/dashboard" component={props => <DashboardPage {...props} />} /> */}
    </Router>
  </>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mstp = state => ({
  isAuthenticated: getIsAuthenticated(state)
});

const AppWithAuth = connect(mstp)(App);

export default hot(AppWithAuth);
