import React from 'react';
import logo from '../../assets/images/logo.png';

import * as s from './Logo.module.css';

const Logo = () => (
  <div className={s.container}>
    <div className={s.imgContainer}>
      <img className={s.logo} src={logo} alt="app logo" />
    </div>
    <h1 className={s.heading}>Raschitalochka</h1>
  </div>
);

export default Logo;
