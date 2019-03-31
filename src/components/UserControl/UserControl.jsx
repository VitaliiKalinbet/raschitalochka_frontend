import React from 'react';
import PropTypes from 'prop-types';
import * as s from './UserControl.module.css';

// const signOut = history => {
//   localStorage.clear();
//   history.push('/login');
// };
const UserControl = ({ user: { name } }) => (
  <div className={s.container}>
    <h5 className={s.text}>{name}</h5>
    <button className={s.button} type="button" onClick={signOut()}>
      <span className={s.button - text}>Logout</span>
    </button>
  </div>
);

UserControl.propTypes = {
  user: PropTypes.objectOf
  // onSignOut: PropTypes.func
};

UserControl.defaultProps = {
  user: {}
  // onSignOut: () => {}
};

export default UserControl;
