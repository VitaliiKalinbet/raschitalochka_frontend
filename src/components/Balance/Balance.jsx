import React from 'react';
import { connect } from 'react-redux';
import * as s from './Balance.module.css';
import * as selectors from '../../redux/modules/User/selectors';

const Balance = () => (
  <div className={s.container}>
    <div className={s.content}>
      <h2 className={s.text}>Total Balance, UAH</h2>
      <h3 className={s.text}>24000</h3>
    </div>
  </div>
);

const mapState = state => ({
  totalBalance: selectors.getTotalBalance(state)
});

export default connect(mapState)(Balance);
