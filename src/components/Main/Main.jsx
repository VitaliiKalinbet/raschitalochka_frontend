import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

import Home from '../Home/Home';
import Diagram from '../Diagram/Diagram';
import Currency from '../Currency/Currency';

import { getFinanceData, getTotalCost, getTotalIncome } from '../../redux/reducers/finance/financeSelectors';
import * as financeOperations from '../../redux/reducers/finance/financeOperations';
import {
  getSortedData,
  getChartData,
  getCurrentMonth,
  getCurrentYear,
  getMonths,
  getYears,
  getFilteredDataBySelectedYear,
  getFilteredDataByYearAndMonth,
  getTableData
} from './functions';

import s from './Main.module.css';

import { options } from './config';

class Main extends Component {
  state = {
    currentMonth: '',
    currentYear: '',
    selectedMonth: '',
    selectedYear: ''
  };

  componentDidMount() {
    const { user, token, history, getUserFinance } = this.props;

    if (!user) history.push('/login');

    this.setState({
      currentMonth: getCurrentMonth(),
      currentYear: getCurrentYear(),
      selectedMonth: getCurrentMonth(),
      selectedYear: getCurrentYear()
    });

    if (user) {
      getUserFinance(user.id, token);
    }
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
    const { data } = this.state;
    const { value } = e.target;
    this.setState({
      selectedYear: value,
      selectedMonth: getMonths(getFilteredDataBySelectedYear(data, value))[0]
    });
  };

  // addToData = obj => {
  //   console.log(obj);
  //   this.setState(state => {
  //     state.data.push(obj);
  //   });
  // };

  render() {
    const { selectedMonth, currentMonth, selectedYear, currentYear } = this.state;
    const {
      data,
      totalCosts,
      totalIncome
      // width
      //  setTotalBalance,
      // addToData
    } = this.props;
    const filteredDataByYearAndMonth = getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth);
    const tableData = getTableData(filteredDataByYearAndMonth);
    const chartData = getChartData(tableData);
    // const {
    // sortedData,
    // tableData,
    // width,
    // totalCosts,
    // totalIncome,
    // selectedMonth,
    // currentMonth,
    // selectedYear,
    // currentYear,
    // chartData,
    // onChange,
    // onUpdate,
    // years,
    // onChangeYear,
    // months,
    // setTotalBalance,
    // addToData
    // totalBalance,
    // typeOftotalBalance
    // } = this.props;

    return (
      <div className={s.mainContainer}>
        <Switch>
          <Route path="/dashboard/currency" component={Currency} />
          <Route
            path="/dashboard/diagram"
            render={() => (
              <Diagram
                // {...props}
                tableData={tableData}
                options={options}
                chartData={chartData}
                totalCosts={totalCosts}
                totalIncome={totalIncome}
                width={width}
                onChange={this.onChange}
                months={getMonths(getFilteredDataBySelectedYear(data, selectedYear))}
                selectedMonth={selectedMonth}
                currentMonth={currentMonth}
                years={getYears(data)}
                currentYear={currentYear}
                onChangeYear={this.onChangeYear}
                selectedYear={selectedYear}
                onUpdate={this.onUpdate}
              />
            )}
          />
          <Route
            path="/dashboard"
            render={() => (
              <Home
                // {...props}
                sortedData={getSortedData(data)}
                // sortedData={sortedData}
                // totalBalance={totalBalance}
                // typeOftotalBalance={typeOftotalBalance}
                // addToData={addToData}
                // setTotalBalance={setTotalBalance}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

Main.defaultProps = {
  user: null,
  token: null
};

Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string
  }),
  token: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getUserFinance: PropTypes.func.isRequired,
  totalCosts: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired
  // sortedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // totalCosts: PropTypes.number.isRequired,
  // totalIncome: PropTypes.number.isRequired,
  // width: PropTypes.number.isRequired
  // chartData: PropTypes.shape({
  //   datasets: PropTypes.array,
  //   labels: PropTypes.array
  // }).isRequired,
  // onChange: PropTypes.func.isRequired,
  // selectedMonth: PropTypes.string.isRequired,
  // selectedYear: PropTypes.string.isRequired,
  // currentMonth: PropTypes.string.isRequired,
  // currentYear: PropTypes.string.isRequired,
  // onChangeYear: PropTypes.func.isRequired,
  // setTotalBalance: PropTypes.func.isRequired,
  // onUpdate: PropTypes.func.isRequired,
  // months: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  // years: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  // addToData: PropTypes.func.isRequired
  // totalBalance: PropTypes.number.isRequired,
  // typeOftotalBalance: PropTypes.string.isRequired
};

const mstp = state => {
  return {
    user: getUser(state),
    token: getToken(state),
    data: getFinanceData(state),
    totalCosts: getTotalCost(state),
    totalIncome: getTotalIncome(state)
  };
};

const mdtp = {
  getUserFinance: financeOperations.getUserFinance,
  // setTotalBalance: financeOperations.setTotalBalance,
  addToData: financeOperations.addToData
};

export default connect(
  mstp,
  mdtp
)(Main);

// DashboardPage.defaultProps = {
// user: null,
// token: null
// };

// DashboardPage.propTypes = {
// data: PropTypes.arrayOf(PropTypes.object).isRequired,
// user: PropTypes.shape({
//   id: PropTypes.string,
//   email: PropTypes.string,
//   name: PropTypes.string
// }),
// token: PropTypes.string,
// location: PropTypes.shape({
//   pathname: PropTypes.string.isRequired
// }).isRequired,
// history: PropTypes.shape({
//   push: PropTypes.func.isRequired
// }).isRequired,
// totalCosts: PropTypes.number.isRequired,
// totalIncome: PropTypes.number.isRequired,
// getUserFinance: PropTypes.func.isRequired
// };

// const mstp = state => {
//   return {
//     user: getUser(state),
//     token: getToken(state),
//     data: getFinanceData(state),
//     totalCosts: getTotalCost(state),
//     totalIncome: getTotalIncome(state)
//   };
// };

// const mdtp = {
//   getUserFinance: financeOperations.getUserFinance
// };
