import React from 'react';

import s from './Table.module.css';

const Table = ({ data }) => {
  console.log(data);
  return (
    <div className={s.tableWrap}>
      <div className={s.table}>
        <p>table</p>
      </div>
    </div>
  );
};

Table.defaultProps = {
  data: []
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array)
};

export default Table;
