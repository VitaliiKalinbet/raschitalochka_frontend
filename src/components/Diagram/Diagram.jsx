import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Table from '../Table/Table';
import Chart from '../Chart/Chart';

import s from './Diagram.module.css';

const Diagram = ({ data, options, chartData, totalCosts, totalIncome, width }) => {
  return (
    <div className={s.container}>
      {width >= 1280 && <p className={s.title}>Cost Diagram</p>}
      <div className={s.wrap}>
        <div className={s.chartWrap}>
          {width >= 768 && width <= 1280 && <p className={s.title}>Cost Diagram</p>}
          <Chart data={chartData} options={options} width={width} />
          <Button style={s.submitBtn} type="submit" value="Udate" />
        </div>
        <div className={s.tableContaiter}>
          <div className={s.selectors}>
            <select className={s.select} name="manth">
              <option className={s.option} value="January">
                January
              </option>
              <option className={s.option} value="February">
                February
              </option>
            </select>
            <select className={s.select} name="year">
              <option className={s.option} value="2019">
                2019
              </option>
            </select>
          </div>

          <Table data={data} totalCosts={totalCosts} width={width} totalIncome={totalIncome} />
        </div>
      </div>
    </div>
  );
};

Diagram.propTypes = {
  options: PropTypes.shape({
    legend: PropTypes.object
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCosts: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  chartData: PropTypes.shape({
    datasets: PropTypes.array
  }).isRequired
};

export default Diagram;
