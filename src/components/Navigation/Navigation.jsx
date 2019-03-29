import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = () => (
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
            <span className={classes.balanceAmount}> 24000 UAH</span>
          </span>
        </div>
      </li>
    </ul>
  </div>
);

export default Navigation;
