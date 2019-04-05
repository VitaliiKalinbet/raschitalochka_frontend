import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

import * as s from './Logo.module.css';

const Logo = () => (
  <Link to="/dashboard" className={s.container}>
    <img className={s.logo} src={logo} alt="app logo" />
    <h1 className={s.heading}>Raschitalochka</h1>
  </Link>
);

export default Logo;
