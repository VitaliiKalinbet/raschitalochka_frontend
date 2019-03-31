import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';

const Sidebar = ({ totalBalance }) => (
  <>
    <Navigation />
    <Balance />
    <Currency />
  </>
);

Sidebar.propTypes = {
  totalBalance: PropTypes.number.isRequired
};

export default Sidebar;
