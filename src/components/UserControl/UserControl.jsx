/* eslint react/prop-types: 0 */
import React from 'react';
import * as s from './UserControl.module.css';

// const signOut = history => {
//   localStorage.clear();
//   history.push('/login');
// };
const UserControl = ({ user: { name }, logout }) => (
  <div className={s.container}>
    <h5 className={s.text}>{name}</h5>
    <button className={s.button} type="button" onClick={logout}>
      <span className={s.buttonText}>Logout</span>
    </button>
  </div>
);

export default UserControl;
