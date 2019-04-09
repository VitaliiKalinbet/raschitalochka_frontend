import React from 'react';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';

import withRequest from '../../hoc/withRequest';
import s from './DashboardPage.module.css';

const DashboardPage = () => (
  <>
    <Header />
    <div className={s.mainWrapper}>
      <Sidebar />
      <Main />
    </div>
  </>
);

export default withRequest(DashboardPage);
