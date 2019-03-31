import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';

import * as API from '../../services/api';

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
    width: window.innerWidth,
    error: ''
  };

  componentDidMount() {
    this.setState({
      currentMonth: getCurrentMonth(),
      currentYear: getCurrentYear(),
      selectedMonth: getCurrentMonth(),
      selectedYear: getCurrentYear()
    });
    window.addEventListener('resize', this.updateDimensions.bind(this));
    const { user, token } = this.props;

    API.getFinanceById(user.id, token)
      .then(({ data }) => {
        this.setState({
          allData: data.finance.data,
          sortedData: getSortedData(getCategoriesArr(data.finance.data))
        });
        return getCategoriesArr(data.finance.data);
      })
      .then(data => {
        const { sortedData } = this.state;
        this.setState({ totalBalance: this.getTotalBalance(sortedData) });
        this.setStateData(data);
      })
      .catch(error => this.setState({ error }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { data } = this.state;
    return data.length !== nextState.length;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  addToData = obj => {
    const { data } = this.state;
    return data.unshift(obj);
  };

  getTotalBalance = arr => arr.pop().balanceAfter;

  setTotalBalance = arr => {
    getSortedData(arr);
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

  handleUpdate = e => {
    e.preventDefault();
    const { selectedYear, selectedMonth, data } = this.state;
    this.setState({
      chartData: getChartData(getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth)),
      tableData: getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth)
    });
  };

  setTotalBalance = value => this.setState({ totalBalance: value });

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

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const {
      allData,
      data,
      sortedData,
      tableData,
      error,
      width,
      totalBalance,
      totalCosts,
      totalIncome,
      selectedMonth,
      currentMonth,
      selectedYear,
      currentYear,
      chartData
    } = this.state;
    return (
      <div>
        <Header />
        <Sidebar totalBalance={totalBalance} />
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
  }).isRequired
};

const mstp = state => {
  return {
    user: getUser(state),
    token: getToken(state)
  };
};

export default connect(mstp)(DashboardPage);
