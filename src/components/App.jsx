import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import DiagramPage from '../pages/DiagramPage/DiagramPage';

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <Router>
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/dashboard/home" component={DashboardPage} />
          <Route path="/dashboard/diagram" component={DiagramPage} />
        </Router>
      </div>
    );
  }
}

export default hot(App);
