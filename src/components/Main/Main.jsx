import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

import Home from '../Home/Home';
import Diagram from '../Diagram/Diagram';

import {
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
import { options } from './config';
import * as API from '../../services/api';

class Main extends Component {
  state = {
    data: [],
    selectedMonth: '',
    currentMonth: '',
    currentYear: '',
    selectedYear: '2018',
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
  }

  componentDidUpdate(prevProps) {
    const { user, token } = this.props;
    if (user !== null && prevProps !== this.props) {
      API.getFinanceById(user.id, token)
        .then(({ data }) => getCategoriesArr(data.finance.data))
        .then(data => {
          this.setStateData(data);
        })
        .catch(error => this.setState({ error }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
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

  handleUpdate = e => {
    e.preventDefault();
    const { selectedYear, selectedMonth, data } = this.state;
    this.setState({
      chartData: getChartData(getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth)),
      tableData: getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth)
    });
  };

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
      data,
      tableData,
      error,
      width,
      totalCosts,
      totalIncome,
      selectedMonth,
      currentMonth,
      selectedYear,
      currentYear,
      chartData
    } = this.state;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        <Switch>
          <Route path="/dashboard/home" render={() => <Home data={data} />} />
          <Route
            path="/dashboard/diagram"
            render={() => (
              <Diagram
                data={data}
                tableData={tableData}
                options={options}
                chartData={chartData}
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
            )}
          />
        </Switch>
      </>
    );
  }
}

Main.defaultProps = {
  user: null,
  token: null
};

Main.propTypes = {
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

export default connect(mstp)(Main);
