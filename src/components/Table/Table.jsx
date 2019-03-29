import React from 'react';
// import ReactTable from 'react-table';
import PropTypes from 'prop-types';

import s from './Table.module.css';

const Table = ({ data, totalCosts, totalIncome }) => {
  return (
    <div className={s.tableWrap}>
      <ul className={s.table}>
        <li className={s.rowHeader}>
          <p className={s.tableHeader}>Categories</p>
          <p className={s.tableHeader}>Amount</p>
        </li>
        {data.map(item => (
          // eslint-disable-next-line no-underscore-dangle
          <li className={s.row} key={item._id}>
            <p className={s.cell}>{item.category}</p>
            <p className={s.cell}>{item.amount}</p>
          </li>
        ))}
      </ul>
      <ul className={s.total}>
        <li className={s.totalRow}>
          <p className={s.totalCosts}>Total Costs:</p>
          <p className={s.totalCostsAmaunt}>{totalCosts}</p>
        </li>
        <li className={s.totalRow}>
          <p className={s.totalIncome}>Total Income:</p>
          <p className={s.totalIncomeAmaunt}>{totalIncome}</p>
        </li>
      </ul>
    </div>
  );
};

Table.defaultProps = {
  data: [],
  totalCosts: 0,
  totalIncome: 0
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array),
  totalCosts: PropTypes.number,
  totalIncome: PropTypes.number
};

export default Table;
