import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from '../../redux/modules/User/selectors';
import operations from '../../redux/modules/User/operations';

import UserControl from '../UserControl/UserControl';
import Logo from '../Logo/Logo';

import * as s from './Header.module.css';

const Header = ({ isAuthenticated, user, onSignOut }) => (
  <header className={s.container}>
    <div className={s.content}>
      <Logo />
      {isAuthenticated ? <UserControl user={user} onSignOut={onSignOut} /> : null}
      <h2>UserControl</h2>
    </div>
  </header>
);

const mapState = state => ({
  isAuthenticated: selectors.isAuthenticated(state),
  user: selectors.getUser(state)
});

const mapDispatch = {
  onSignOut: operations.signOut
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.objectOf(),
  onSignOut: PropTypes.func
};

Header.defaultProps = {
  isAuthenticated: false,
  user: () => {},
  onSignOut: () => {}
};

export default connect(
  mapState,
  mapDispatch
)(Header);
