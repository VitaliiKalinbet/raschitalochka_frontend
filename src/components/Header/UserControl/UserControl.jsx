import React from 'react';
import * as s from './UserControl.module.css';

const UserControl = ({ user: { name }, onSignOut = () => null }) => {
  <div>
    <h5 className={s.text}>{name}</h5>
    <button onClick={onSignOut}>Logout</button>
  </div>;
};

export default UserControl;
