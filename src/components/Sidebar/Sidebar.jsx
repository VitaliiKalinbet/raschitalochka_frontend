import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';

const Sidebar = ({ totalBalance, width }) => (
  <>
    <Navigation totalBalance={totalBalance} />
    <Balance totalBalance={totalBalance} />
    {width > 1024 ? <Currency /> : null}
  </>
);

Sidebar.propTypes = {
  width: PropTypes.number.isRequired,
  totalBalance: PropTypes.number.isRequired
};

export default Sidebar;
