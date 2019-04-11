import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withWidth from '../../hoc/withWidth';

import Table from '../Table/Table';
import Chart from '../Chart/Chart';
import { getTotalCost, getTotalIncome, getFinanceData } from '../../redux/reducers/finance/financeSelectors';
import * as financeOperations from '../../redux/reducers/finance/financeOperations';
import { options } from './config';
import {
  // getSortedData,
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
    // currentMonth: '',
    // currentYear: '',
    selectedMonth: '',
    selectedYear: ''
  };

  componentDidMount() {
    this.setState({
      // currentMonth: getCurrentMonth(),
      // currentYear: getCurrentYear(),
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
    // const {
    //   tableData,
    //   options,
    //   chartData,
    //   totalCosts,
    //   totalIncome,
    //   width,
    //   onChange,
    //   selectedMonth,
    //   months,
    //   years,
    //   onChangeYear,
    //   selectedYear,
    //   onUpdate
    // } = this.props;
    const {
      selectedMonth,
      selectedYear
      // currentMonth,currentYear
    } = this.state;
    const {
      data,
      totalCosts,
      totalIncome,
      width
      //  setTotalBalance,
      // addToData
    } = this.props;
    const filteredDataByYearAndMonth = getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth);
    const tableData = getTableData(filteredDataByYearAndMonth);
    const chartData = getChartData(tableData);
    const months = getMonths(getFilteredDataBySelectedYear(data, selectedYear));
    const years = getYears(data);

    return (
      <div className={s.container}>
        {width >= 1024 && <p className={s.title}>Cost Diagram</p>}
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
      </div>
    );
  }
}

Diagram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCosts: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
  // options: PropTypes.shape({
  //   legend: PropTypes.object
  // }).isRequired,
  // tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // chartData: PropTypes.shape({
  //   datasets: PropTypes.array,
  //   labels: PropTypes.array
  // }).isRequired,
  // onChange: PropTypes.func.isRequired,
  // selectedMonth: PropTypes.string.isRequired,
  // selectedYear: PropTypes.string.isRequired,
  // onChangeYear: PropTypes.func.isRequired,
  // onUpdate: PropTypes.func.isRequired,
  // months: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  // years: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mstp = state => ({
  // user: getUser(state),
  // token: getToken(state),
  data: getFinanceData(state),
  totalCosts: getTotalCost(state),
  totalIncome: getTotalIncome(state)
});

const mdtp = {
  // getUserFinance: financeOperations.getUserFinance,
  // setTotalBalance: financeOperations.setTotalBalance,
  addToData: financeOperations.addToData
};

export default connect(
  mstp,
  mdtp
)(withWidth(Diagram));
