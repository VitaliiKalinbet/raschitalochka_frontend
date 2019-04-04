import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';
import s from './Sidebar.module.css';

const Sidebar = ({ totalBalance, width }) => (
  <div className={s.sidebar}>
    <Navigation totalBalance={totalBalance} width={width} />
    <Balance totalBalance={totalBalance} />
    {width > 1024 ? <Currency /> : null}
  </div>
);

Sidebar.propTypes = {
  width: PropTypes.number.isRequired,
  totalBalance: PropTypes.number.isRequired
};

export default Sidebar;
