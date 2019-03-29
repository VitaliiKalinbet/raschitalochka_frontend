import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';

class DashboardPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Main {...this.props} />
      </div>
    );
  }
}

export default DashboardPage;
