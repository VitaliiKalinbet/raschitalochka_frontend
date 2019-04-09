import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTotalBalance } from '../../redux/reducers/finance/financeSelectors';
import classes from './Navigation.module.css';

const Navigation = ({ totalBalance, width }) => (
  <div className={classes.container}>
    <ul className={classes.nav}>
      <li className={classes.listItem}>
        <NavLink exact to="/dashboard" className={classes.linkHome} activeClassName={classes.activeLink}>
          <span className={classes.linkText}>Home</span>
        </NavLink>
      </li>
      <li className={classes.listItem}>
        <NavLink exact to="/dashboard/diagram" className={classes.linkDiagram} activeClassName={classes.activeLink}>
          <span className={classes.linkText}>Diagram</span>
        </NavLink>
      </li>
      {width < 1024 ? (
        <>
          <li className={classes.listItem}>
            <NavLink to="/dashboard/currency" className={classes.linkCurrency} activeClassName={classes.activeLink}>
              <span className={classes.linkText}>Currency</span>
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
        </>
      ) : null}
    </ul>
  </div>
);

Navigation.defaultProps = {
  totalBalance: 0,
  width: 0
};

Navigation.propTypes = {
  totalBalance: PropTypes.number,
  width: PropTypes.number
};

const mstp = state => ({ totalBalance: getTotalBalance(state) });

export default connect(mstp)(Navigation);
