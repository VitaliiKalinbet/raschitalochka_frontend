import React from 'react';
import PropTypes from 'prop-types';

import * as s from './Balance.module.css';

const Balance = ({ totalBalance }) => (
  <div className={s.container}>
    <div className={s.content}>
      <h2 className={s.text}>Total Balance, UAH</h2>
      <h3 className={s.text}>{totalBalance}</h3>
    </div>
  </div>
);

Balance.propTypes = {
  totalBalance: PropTypes.number.isRequired
};

export default Balance;
