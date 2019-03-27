import React from 'react';
import PropTypes from 'prop-types';
import * as s from './UserControl.module.css';

const UserControl = ({ user: { name }, onSignOut = () => null }) => (
  <div className={s.container}>
    <h5 className={s.text}>{name}</h5>
    <button className={s.button} type="button" onClick={onSignOut}>
      <span>Logout</span>
    </button>
  </div>
);

UserControl.propTypes = {
  user: PropTypes.objectOf,
  onSignOut: PropTypes.func
};

UserControl.defaultProps = {
  user: {},
  onSignOut: () => {}
};

export default UserControl;
