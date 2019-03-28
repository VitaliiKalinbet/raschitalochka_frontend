import React from 'react';

import s from './Chart.module.css';

const Chart = ({ data }) => {
  console.log(data);
  return (
    <div className={s.wrap}>
      <div className={s.diagramWrap} />
    </div>
  );
};

Chart.defaultProps = {
  data: []
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array)
};

export default Chart;
