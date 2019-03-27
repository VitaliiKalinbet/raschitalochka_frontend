import React from 'react';
import PropTypes from 'prop-types';
import * as s from './UserControl.module.css';

const UserControl = ({ user: { name }, onSignOut = () => null }) => (
  <div>
    <h5 className={s.text}>{name}</h5>
    <button className="button" type="button" onClick={onSignOut}>
      Logout
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
