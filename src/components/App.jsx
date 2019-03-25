import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <Router>
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/dashboard/home" component={DashboardPage} />
        </Router>
        <som />
      </div>
    );
  }
}

export default hot(App);
