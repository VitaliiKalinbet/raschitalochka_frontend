import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';

const Picker = ({ style, selected, onChange }) => <DatePicker className={style} onChange={onChange} value={selected} />;

Picker.defaultProps = {
  style: '',
  selected: '',
  onChange: () => null
};

Picker.propTypes = {
  style: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func
};

export default Picker;
