import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = () => (
  <div className={classes.container}>
    <ul className={classes.nav}>
      <li className={classes.listItem}>
        <NavLink to="/dashboard/home" className={classes.linkHome} activeClassName={classes.activeLink}>
          <span className={classes.linkText}>Home</span>
        </NavLink>
      </li>
      <li className={classes.listItem}>
        <NavLink to="/dashboard/diagram" className={classes.linkDiagram} activeClassName={classes.activeLink}>
          <span className={classes.linkText}>Diagram</span>
        </NavLink>
      </li>

      <li className={classes.listItem}>
        <div className={classes.linkCurrency}>
          <div className={classes.linkText}>
            <span>Total Balance:</span>
            <span className={classes.balanceAmount}> 24000 UAH</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

export default Navigation;
