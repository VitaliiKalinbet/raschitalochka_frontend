import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './Navigation.module.css';

const Navigation = ({ totalBalance }) => (
  <div className={classes.container}>
    <ul className={classes.nav}>
      <li className={classes.listItem}>
        <NavLink to="/dashboard/home" className={classes.link} activeClassName={classes.activeLink}>
          <span className={classes.linkText}>Home</span>
        </NavLink>
      </li>
      <li className={classes.listItem}>
        <NavLink to="/dashboard/diagram" className={classes.link} activeClassName={classes.activeLink}>
          <span className={classes.linkText}>Diagram</span>
        </NavLink>
      </li>

      <li className={classes.listItem}>
        <div className={classes.link}>
          <span className={classes.linkText}>
            Total Balance:
            <span className={classes.balanceAmount}>{` ${totalBalance} UAH`}</span>
          </span>
        </div>
      </li>
    </ul>
  </div>
);

Navigation.propTypes = {
  totalBalance: PropTypes.number.isRequired
};

export default Navigation;
