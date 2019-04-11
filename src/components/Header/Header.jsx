import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import withAuth from '../../hoc/withAuth';
import UserControl from '../UserControl/UserControl';
import Logo from '../Logo/Logo';

import * as s from './Header.module.css';

const Header = ({ isAuthenticated, user, logout }) => (
  <header className={s.container}>
    <div className={s.content}>
      <Logo />
      {isAuthenticated ? <UserControl user={user} logout={logout} /> : <Redirect to="/login" />}
    </div>
  </header>
);

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({ email: PropTypes.string }),
  logout: PropTypes.func
};

Header.defaultProps = {
  isAuthenticated: null,
  user: null,
  logout: () => null
};

export default withAuth(Header);
