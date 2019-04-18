import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withWidth from '../../hoc/withWidth';

import Table from '../Table/Table';
import Chart from '../Chart/Chart';
import { getFinanceData } from '../../redux/reducers/finance/financeSelectors';
import * as financeOperations from '../../redux/reducers/finance/financeOperations';
import { options } from './config';
import {
  getTotalByType,
  getChartData,
  getCurrentMonth,
  getCurrentYear,
  getMonths,
  getYears,
  getFilteredDataBySelectedYear,
  getFilteredDataByYearAndMonth,
  getTableData
} from './functions';

import s from './Diagram.module.css';

class Diagram extends Component {
  state = {
    selectedMonth: '',
    selectedYear: ''
  };

  componentDidMount() {
    this.setState({
      selectedMonth: getCurrentMonth(),
      selectedYear: getCurrentYear()
    });
  }

  handleChange = e => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleChangeYear = e => {
    e.preventDefault();
    const { data } = this.props;
    const { value } = e.target;
    this.setState({
      selectedYear: value,
      selectedMonth: getMonths(getFilteredDataBySelectedYear(data, value))[0]
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    this.render();
  };

  render() {
    const { selectedMonth, selectedYear } = this.state;
    const { data, width } = this.props;
    const filteredDataByYearAndMonth = getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth);
    const tableData = getTableData(filteredDataByYearAndMonth);
    const chartData = getChartData(tableData);
    const months = getMonths(getFilteredDataBySelectedYear(data, selectedYear));
    const years = getYears(data);

    const totalCosts = getTotalByType(filteredDataByYearAndMonth, '-');
    const totalIncome = getTotalByType(filteredDataByYearAndMonth, '+');

    return (
      <div className={s.container}>
        {width >= 1024 && <p className={s.title}>Cost Diagram</p>}
        {tableData.length > 0 ? (
          <div className={s.wrap}>
            <div className={s.chartWrap}>
              {width >= 768 && width < 1024 && <p className={s.title}>Cost Diagram</p>}
              <Chart data={chartData} width={width} options={options} />
            </div>
            <div className={s.tableContaiter}>
              <div className={s.selectors}>
                <select className={s.select} onChange={this.handleChange} value={selectedMonth} name="selectedMonth">
                  {months.map(month => (
                    <option key={month} className={s.option} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select className={s.select} onChange={this.handleChangeYear} value={selectedYear} name="selectedYear">
                  {years.map(year => (
                    <option key={year} className={s.option} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <Table data={tableData} totalCosts={totalCosts} width={width} totalIncome={totalIncome} />
            </div>
          </div>
        ) : (
          <p className={s.addCosts}>To build a schedule, please add the costs</p>
        )}
      </div>
    );
  }
}

Diagram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired
};

const mstp = state => ({
  data: getFinanceData(state)
});

const mdtp = {
  addToData: financeOperations.addToData
};

export default connect(
  mstp,
  mdtp
)(withWidth(Diagram));
