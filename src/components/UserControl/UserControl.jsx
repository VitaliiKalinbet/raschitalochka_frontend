/* eslint react/prop-types: 0 */
import React from 'react';
import * as s from './UserControl.module.css';

const UserControl = ({ user: { name }, onSignOut = () => null }) => (
  <div className={s.container}>
    <h5 className={s.text}>{name}</h5>
    <button className={s.button} type="button" onClick={onSignOut}>
      <span className={s.buttonText}>Logout</span>
    </button>
  </div>
);

export default UserControl;
