import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../redux/modules/User/slectors';
import { signOut } from '../../redux/modules/User/operations';

import UserControl from './UserControl/UserControl';
import Logo from './Logo/Logo';

import * as s from './Header.module.css';

const Header = ({ isAuthenticated, user, onSignOut }) => {
  <header className={s.container}>
    <div className={s.content}>
      <Logo />
      {isAuthenticated ? (
        <UserControl user={user} onSignOut={onSignOut} />
      ) : null}
    </div>
  </header>;
};

const mapState = state => ({
  isAuthenticated: selectors.isAuthenticated(state),
  user: selectors.getUser(state)
});

const mapDispatch = {
  onSignOut: signOut
};

export default connect(
  mapState,
  mapDispatch
)(Header);
