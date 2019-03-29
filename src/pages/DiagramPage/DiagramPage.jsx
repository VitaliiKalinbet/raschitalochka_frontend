import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

import s from './DiagramPage.module.css';

class DiagramPage extends Component {
  state = {};

  render() {
    return (
      <div className={s.wrap}>
        <Header />
        <Main {...this.props} />
      </div>
    );
  }
}

export default DiagramPage;
