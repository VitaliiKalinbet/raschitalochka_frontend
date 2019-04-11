import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTotalBalance } from '../../redux/reducers/finance/financeSelectors';

import * as s from './Balance.module.css';

const Balance = ({ totalBalance }) => (
  <div className={s.container}>
    <div className={s.content}>
      <h2 className={s.text}>Total Balance, UAH</h2>
      <h3 className={s.text}>{totalBalance}</h3>
    </div>
  </div>
);

Balance.defaultProps = {
  totalBalance: null
};

Balance.propTypes = {
  totalBalance: PropTypes.number
};

const mstp = state => ({ totalBalance: getTotalBalance(state) });

export default connect(mstp)(Balance);
