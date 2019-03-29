import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import * as selectors from '../../redux/modules/User/selectors';

import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
// import Currency from '../Currency/Currency';
// import s from './Sidebar.module.css';

const Sidebar = () => (
  <>
    <Navigation />
    <Balance />
  </>
);

export default Sidebar;
