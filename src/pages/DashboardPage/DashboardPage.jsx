import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';

import financeSelectors from '../../redux/reducers/finance/financeSelectors';
import * as financeOperations from '../../redux/reducers/finance/financeOperations';
// import * as sessionOperation from '../../redux/reducers/session/sessionOperations';
import s from './DashboardPage.module.css';
import withWidth from '../../hoc/withWidth';
import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';
import {
  getSortedData,
  getChartData,
  // getTotalByType,
  getCurrentMonth,
  getCurrentYear,
  getMonths,
  getYears,
  getFilteredDataBySelectedYear,
  getFilteredDataByYearAndMonth,
  getTableData
} from './functions';

class DashboardPage extends Component {
  state = {
    data: [],
    selectedMonth: '',
    currentMonth: '',
    currentYear: '',
    selectedYear: '',
    totalBalance: 0,
    typeOftotalBalance: '+',
    tableData: [],
    error: ''
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

  getTotalBalance = obj => {
    const { typeTotalBalance, totalBalance = 0 } = obj;
    return this.returnValueByType(typeTotalBalance, totalBalance);
  };

  returnValueByType = (type, value) => {
    return type === '-' ? -Math.abs(value) : value;
  };

  setStateData = data => {
    const { currentYear, currentMonth } = this.state;
    return this.setState({
      data,
      tableData: getTableData(getFilteredDataByYearAndMonth(data, currentYear, currentMonth))
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    const { data, selectedYear, selectedMonth } = this.state;
    this.setState({
      tableData: getTableData(getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth))
    });
  };

  setTotalBalance = (type, value) => {
    this.setState({
      totalBalance: this.returnValueByType(type, value),
      typeOftotalBalance: type
    });
  };

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

  addToData = obj => {
    console.log(obj);
    this.setState(state => {
      state.data.push(obj);
    });
  };

  render() {
    const {
      // data,
      tableData,
      error,
      totalBalance,
      typeOftotalBalance,
      selectedMonth,
      currentMonth,
      selectedYear,
      currentYear
    } = this.state;
    const { width, data, totalCosts, totalIncome } = this.props;
    const chartData = getChartData(tableData);
    // console.log(this.props);

    return (
      <>
        <Header />
        <div className={s.mainWrapper}>
          <Sidebar totalBalance={totalBalance} width={width} {...this.props} />
          <Main
            addToData={this.addToData}
            error={error}
            setTotalBalance={this.setTotalBalance}
            sortedData={getSortedData(data)}
            tableData={tableData}
            chartData={chartData}
            totalBalance={totalBalance}
            typeOftotalBalance={typeOftotalBalance}
            totalCosts={totalCosts}
            totalIncome={totalIncome}
            width={width}
            onChange={this.handleChange}
            months={getMonths(getFilteredDataBySelectedYear(data, selectedYear))}
            selectedMonth={selectedMonth}
            currentMonth={currentMonth}
            years={getYears(data)}
            currentYear={currentYear}
            onChangeYear={this.handleChangeYear}
            selectedYear={selectedYear}
            onUpdate={this.handleUpdate}
          />
        </div>
      </>
    );
  }
}

DashboardPage.defaultProps = {
  user: null,
  token: null
};

DashboardPage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string
  }),
  token: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  width: PropTypes.number.isRequired,
  totalCosts: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  getUserFinance: PropTypes.func.isRequired
};

const mstp = state => {
  return {
    user: getUser(state),
    token: getToken(state),
    data: financeSelectors.getFinanceData(state),
    totalCosts: financeSelectors.getTotalCost(state),
    totalIncome: financeSelectors.getTotalIncome(state)
  };
};

const mdtp = {
  getUserFinance: financeOperations.getUserFinance
};

export default connect(
  mstp,
  mdtp
)(withWidth(DashboardPage));
