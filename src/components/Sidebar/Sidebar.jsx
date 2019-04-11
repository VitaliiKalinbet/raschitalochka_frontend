import React from 'react';
import PropTypes from 'prop-types';

import withWidth from '../../hoc/withWidth';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';
import s from './Sidebar.module.css';

const Sidebar = ({ width }) => (
  <div className={s.sidebar}>
    <Navigation width={width} />
    <Balance />
    {width > 1024 ? <Currency /> : null}
  </div>
);

Sidebar.propTypes = {
  width: PropTypes.number.isRequired
};

export default withWidth(Sidebar);
