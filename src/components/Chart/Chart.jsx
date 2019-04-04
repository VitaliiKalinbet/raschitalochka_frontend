import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import s from './Chart.module.css';

const getChartSize = num => (num < 768 ? 320 : 320);

const Chart = ({ data, options, width }) => {
  const size = getChartSize(width);
  return (
    <div className={s.diagramWrap}>
      <Pie options={options} data={data} width={size} height={size} />
    </div>
  );
};

Chart.propTypes = {
  options: PropTypes.shape({
    legend: PropTypes.object
  }).isRequired,
  data: PropTypes.shape({
    labels: PropTypes.array,
    datasets: PropTypes.array
  }).isRequired,
  width: PropTypes.number.isRequired
};

export default Chart;
