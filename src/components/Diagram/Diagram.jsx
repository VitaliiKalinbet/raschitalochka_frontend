import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import Table from '../Table/Table';
import Chart from '../Chart/Chart';

import s from './Diagram.module.css';

const Diagram = ({
  tableData,
  options,
  chartData,
  totalCosts,
  totalIncome,
  width,
  onChange,
  selectedMonth,
  months,
  years,
  onChangeYear,
  selectedYear,
  onUpdate
}) => (
  <div className={s.container}>
    {width >= 1024 && <p className={s.title}>Cost Diagram</p>}
    <div className={s.wrap}>
      <div className={s.chartWrap}>
        {width >= 768 && width < 1024 && <p className={s.title}>Cost Diagram</p>}
        <Chart data={chartData} options={options} width={width} />
        <Button style={s.submitBtn} onClick={onUpdate} type="button" value="Update" />
      </div>
      <div className={s.tableContaiter}>
        <div className={s.selectors}>
          <select className={s.select} onChange={onChange} value={selectedMonth} name="selectedMonth">
            {months.map(month => (
              <option key={month} className={s.option} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select className={s.select} onChange={onChangeYear} value={selectedYear} name="selectedYear">
            {years.map(year => (
              <option key={year} className={s.option} value={year}>
                {year}
              </option>
            ))}
            )
          </select>
        </div>

        <Table data={tableData} totalCosts={totalCosts} width={width} totalIncome={totalIncome} />
      </div>
    </div>
  </div>
);

Diagram.propTypes = {
  options: PropTypes.shape({
    legend: PropTypes.object
  }).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCosts: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  chartData: PropTypes.shape({
    datasets: PropTypes.array,
    labels: PropTypes.array
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  onChangeYear: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  months: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  years: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Diagram;
