import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import s from './Chart.module.css';

const Chart = ({ data }) => {
  return (
    <div className={s.wrap}>
      <div className={s.diagramWrap}>
        <Pie data={data} width={320} height={320} />
      </div>
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.array,
    datasets: PropTypes.array
  }).isRequired
};

export default Chart;
