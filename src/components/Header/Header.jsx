import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from '../../redux/reducers/session/sessionSelectors';
// import operations from '../../redux/reducers/session/sessionOperations';

import UserControl from '../UserControl/UserControl';
import Logo from '../Logo/Logo';

import * as s from './Header.module.css';

const Header = ({ isAuthenticated, user, onSignOut }) => (
  <header className={s.container}>
    <div className={s.content}>
      <Logo />
      {isAuthenticated ? <UserControl user={user} onSignOut={onSignOut} /> : null}
    </div>
  </header>
);

const mapState = state => ({
  isAuthenticated: selectors.getIsAuthenticated(state),
  user: selectors.getUser(state)
});

const mapDispatch = {
  onSignOut: () => null
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({ email: PropTypes.string }),
  onSignOut: PropTypes.func
};

Header.defaultProps = {
  isAuthenticated: null,
  user: null,
  onSignOut: () => null
};

export default connect(
  mapState,
  mapDispatch
)(Header);
