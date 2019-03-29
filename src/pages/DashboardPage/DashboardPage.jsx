import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

class DashboardPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
      </div>
    );
  }
}

export default DashboardPage;
