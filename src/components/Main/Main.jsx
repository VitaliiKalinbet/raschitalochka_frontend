import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

import Home from '../Home/Home';
import Diagram from '../Diagram/Diagram';
import Currency from '../Currency/Currency';

import s from './Main.module.css';

import { options } from './config';

const Main = ({
  sortedData,
  tableData,
  width,
  totalCosts,
  totalIncome,
  selectedMonth,
  currentMonth,
  selectedYear,
  currentYear,
  chartData,
  onChange,
  onUpdate,
  years,
  onChangeYear,
  months,
  setTotalBalance,
  addToData,
  totalBalance
}) => (
  <div className={s.mainContainer}>
    <Switch>
      <Route path="/dashboard/currency" component={Currency} />
      <Route
        path="/dashboard/diagram"
        render={() => (
          <Diagram
            tableData={tableData}
            options={options}
            chartData={chartData}
            totalCosts={totalCosts}
            totalIncome={totalIncome}
            width={width}
            onChange={onChange}
            months={months}
            selectedMonth={selectedMonth}
            currentMonth={currentMonth}
            years={years}
            currentYear={currentYear}
            onChangeYear={onChangeYear}
            selectedYear={selectedYear}
            onUpdate={onUpdate}
          />
        )}
      />
      <Route
        path="/dashboard"
        render={() => (
          <Home
            data={sortedData.reverse()}
            totalBalance={totalBalance}
            addToData={addToData}
            setTotalBalance={setTotalBalance}
          />
        )}
      />
    </Switch>
  </div>
);

Main.propTypes = {
  sortedData: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  currentMonth: PropTypes.string.isRequired,
  currentYear: PropTypes.string.isRequired,
  onChangeYear: PropTypes.func.isRequired,
  setTotalBalance: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  months: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  years: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  addToData: PropTypes.func.isRequired,
  totalBalance: PropTypes.number.isRequired
};

const mstp = state => {
  return {
    user: getUser(state),
    token: getToken(state)
  };
};

export default connect(mstp)(Main);
