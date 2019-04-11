import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
// import DatePicker from 'react-date-picker';
import './style.scss';

const Picker = ({ date, onChange }) => {
  return <DatePicker className="react-date-picker" onChange={onChange} value={date} format="dd-MM" />;
};

Picker.defaultProps = {
  //   style: '',
  date: {},
  onChange: () => null
};

Picker.propTypes = {
  //   style: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
};

export default Picker;
