import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';

import s from './DashboardPage.module.css';
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
    typeOftotalBalance: '+',
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
    // console.log(obj);
    const { typeTotalBalance, totalBalance = 0 } = obj;
    return this.returnValueByType(typeTotalBalance, totalBalance);
  };

  returnValueByType = (type, value) => {
    console.log(type, value);
    return type === '-' ? -Math.abs(value) : value; // && !value.includes('-')
  };

  setStateData = data => {
    const { currentYear, currentMonth } = this.state;
    return this.setState({
      data,
      totalCosts: getTotalByType(data, '-'),
      totalIncome: getTotalByType(data, '+'),
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
    console.log(Number.isInteger(value));
    console.log(this.returnValueByType(type, value));
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
      typeOftotalBalance,
      totalCosts,
      totalIncome,
      selectedMonth,
      currentMonth,
      selectedYear,
      currentYear,
      chartData
    } = this.state;
    const { width } = this.props;
    // console.log('dashboard state: ', this.state);

    // console.log('dashboard totalBalance: ', totalBalance);
    // console.log('dashboard totalBalance: ', -Math.abs(totalBalance));
    // console.log('dashboard totalBalance: ', `-${totalBalance}`);
    return (
      <>
        <Header />
        <div className={s.mainWrapper}>
          <Sidebar totalBalance={totalBalance} width={width} {...this.props} />
          <Main
            // {...this.props}
            addToData={this.addToData}
            error={error}
            setTotalBalance={this.setTotalBalance}
            sortedData={sortedData}
            allData={allData}
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
