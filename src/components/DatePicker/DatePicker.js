import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
// import DatePicker from 'react-date-picker';
import './style.scss';

const Picker = ({ selected, onChange }) => (
  <DatePicker className="react-date-picker" onChange={onChange} value={selected} />
);

Picker.defaultProps = {
  //   style: '',
  selected: '',
  onChange: () => null
};

Picker.propTypes = {
  //   style: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func
};

export default Picker;
