import React from 'react';

import * as s from './Logo.module.css';

const Logo = () => {
  <div>
    <div className={logo_container}>
      <img className={logo} src="../../../assets/img/logo.png" alt="app logo" />
    </div>
    <h1 className={s.heading}>Raschitalochka</h1>
  </div>;
};

export default Logo;
