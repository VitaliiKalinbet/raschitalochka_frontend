import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/button-has-type */
const Button = ({ type, style, value, onClick }) => (
  <button className={style} type={type} onClick={onClick}>
    {value}
  </button>
);

Button.defaultProps = {
  type: 'button',
  onClick: () => null,
  style: '',
  value: {}
};

Button.propTypes = {
  type: PropTypes.string,
  value:
    PropTypes.string.isRequired ||
    PropTypes.shape({ props: shape({ children: PropTypes.arrayOf(object) }) }).isRequired,
  onClick: PropTypes.func,
  style: PropTypes.string
};

export default Button;
