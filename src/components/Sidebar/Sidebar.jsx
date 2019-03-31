import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';

const Sidebar = ({ totalBalance }) => (
  <>
    <Navigation totalBalance={totalBalance} />
    <Balance totalBalance={totalBalance} />
  </>
);

Sidebar.propTypes = {
  totalBalance: PropTypes.number.isRequired
};

export default Sidebar;
