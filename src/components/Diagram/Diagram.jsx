import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Table from '../Table/Table';
import Chart from '../Chart/Chart';

import btnStyle from '../Login/Login.module.css';

import s from './Diagram.module.css';

const Diagram = ({ data, chartData, totalCosts, totalIncome, width }) => {
  return (
    <div className={s.wrap}>
      {width >= 768 && <p className={s.title}>Cost Diagram</p>}
      <Chart data={chartData} width={width} />
      <div className={s.diagramWrap} />
      <Button style={btnStyle.submitBtn} type="submit" value="Udate" />

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

      <Table data={data} totalCosts={totalCosts} totalIncome={totalIncome} />
    </div>
  );
};

Diagram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  totalCosts: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default Diagram;
