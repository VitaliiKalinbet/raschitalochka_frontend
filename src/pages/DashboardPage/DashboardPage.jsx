import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';

import * as API from '../../services/api';
import withWidth from '../../hoc/withWidth';
import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';
import {
  getSortedData,
  getChartData,
  getCategoriesArr,
  getTotalByType,
  getCurrentMonth,
  getCurrentYear,
  getMonths,
  getYears,
  getFilteredDataBySelectedYear,
  getFilteredDataByYearAndMonth
} from './functions';

class DashboardPage extends Component {
  state = {
    allData: [],
    data: [],
    sortedData: [],
    selectedMonth: '',
    currentMonth: '',
    currentYear: '',
    selectedYear: '',
    totalBalance: 0,
    totalCosts: 0,
    totalIncome: 0,
    chartData: {},
    tableData: [],
    error: ''
  };

  componentDidMount() {
    const { user, token, history } = this.props;

    if (!user) history.push('/login');

    this.setState({
      currentMonth: getCurrentMonth(),
      currentYear: getCurrentYear(),
      selectedMonth: getCurrentMonth(),
      selectedYear: getCurrentYear()
    });

    if (user) {
      API.getFinanceById(user.id, token)
        .then(({ data }) => {
          console.log('data from first api', data);
          this.setState({
            totalBalance: this.getTotalBalance(data.finance),
            allData: data.finance.data,
            sortedData: getSortedData(getCategoriesArr(data.finance.data))
          });
          // console.log(data);
          return getCategoriesArr(data.finance.data);
        })
        .then(data => {
          this.setStateData(data);
        })
        .catch(error => this.setState({ error }));
    }
  }

  getTotalBalance = obj => {
    const { type = '-', totalBalance = 0 } = obj;
    return this.returnValueByType(type, totalBalance);
  };

  returnValueByType = (type, value) => (type === '-' ? -Math.abs(value) : value);

  setStateData = data => {
    const { currentYear, currentMonth } = this.state;
    return this.setState({
      data,
      totalCosts: getTotalByType(data, '+'),
      totalIncome: getTotalByType(data, '-'),
      chartData: getChartData(getFilteredDataByYearAndMonth(data, currentYear, currentMonth)),
      tableData: getFilteredDataByYearAndMonth(data, currentYear, currentMonth)
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    const { selectedYear, selectedMonth, data } = this.state;
    this.setState({
      chartData: getChartData(getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth)),
      tableData: getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth)
    });
  };

  setTotalBalance = (type, value) => {
    this.setState({
      totalBalance: type === '-' ? -Math.abs(value) : value
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
    this.setState(state => {
      state.sortedData.push(obj);
    });
  };

  render() {
    const {
      allData,
      data,
      sortedData,
      tableData,
      error,
      totalBalance,
      totalCosts,
      totalIncome,
      selectedMonth,
      currentMonth,
      selectedYear,
      currentYear,
      chartData
    } = this.state;
    const { width } = this.props;
    return (
      <div>
        <Header />
        <Sidebar totalBalance={totalBalance} {...this.props} />
        <Main
          {...this.props}
          addToData={this.addToData}
          error={error}
          setTotalBalance={this.setTotalBalance}
          sortedData={sortedData}
          allData={allData}
          tableData={tableData}
          chartData={chartData}
          totalBalance={totalBalance}
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
    );
  }
}

DashboardPage.defaultProps = {
  user: null,
  token: null
};

DashboardPage.propTypes = {
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
  width: PropTypes.number.isRequired
};

const mstp = state => {
  return {
    user: getUser(state),
    token: getToken(state)
  };
};

export default connect(mstp)(withWidth(DashboardPage));
