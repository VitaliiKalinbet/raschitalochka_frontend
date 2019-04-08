import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';

// import { getFinanceData, getTotalCost, getTotalIncome } from '../../redux/reducers/finance/financeSelectors';
// import * as financeOperations from '../../redux/reducers/finance/financeOperations';
import s from './DashboardPage.module.css';
// import withWidth from '../../hoc/withWidth';
// import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';
// import {
//   getSortedData,
//   getChartData,
//   getCurrentMonth,
//   getCurrentYear,
//   getMonths,
//   getYears,
//   getFilteredDataBySelectedYear,
//   getFilteredDataByYearAndMonth,
//   getTableData
// } from './functions';

const DashboardPage = ({ history }) => (
  <>
    <Header />
    <div className={s.mainWrapper}>
      <Sidebar />
      <Main
        history={history}
        // addToData={this.addToData}
        // // setTotalBalance={this.setTotalBalance}
        // sortedData={getSortedData(data)}
        // // tableData={tableData}
        // chartData={chartData}
        // totalCosts={totalCosts}
        // totalIncome={totalIncome}
        // onChange={this.handleChange}
        // months={getMonths(getFilteredDataBySelectedYear(data, selectedYear))}
        // selectedMonth={selectedMonth}
        // currentMonth={currentMonth}
        // years={getYears(data)}
        // currentYear={currentYear}
        // onChangeYear={this.handleChangeYear}
        // selectedYear={selectedYear}
        // onUpdate={this.handleUpdate}
      />
    </div>
  </>
);

// class DashboardPage extends Component {
//   state = {};

// getTotalBalance = obj => {
//   const { typeTotalBalance, totalBalance = 0 } = obj;
//   return this.returnValueByType(typeTotalBalance, totalBalance);
// };

// returnValueByType = (type, value) => {
//   return type === '-' ? -Math.abs(value) : value;
// };

// setStateData = data => {
//   const { currentYear, currentMonth } = this.state;
//   return this.setState({
//     data,
//     tableData: getTableData(getFilteredDataByYearAndMonth(data, currentYear, currentMonth))
//   });
// };

// handleUpdate = e => {
//   e.preventDefault();
//   const { data, selectedYear, selectedMonth } = this.state;
//   this.setState({
//     tableData: getTableData(getFilteredDataByYearAndMonth(data, selectedYear, selectedMonth))
//   });
// };

// setTotalBalance = (type, value) => {
//   console.log(type, value);
//   this.setState({
//     // totalBalance: this.returnValueByType(type, value),
//     // typeOftotalBalance: type
//   });
// };

//   render() {
//     return (

//     );
//   }
// }

DashboardPage.defaultProps = {
  // user: null,
  // token: null
};

DashboardPage.propTypes = {
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
  // totalCosts: PropTypes.number.isRequired,
  // totalIncome: PropTypes.number.isRequired,
  // getUserFinance: PropTypes.func.isRequired
};

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

export default DashboardPage;
