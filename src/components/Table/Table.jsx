import React from 'react';
import PropTypes from 'prop-types';
import newId from 'uuid/v4';

import s from './Table.module.css';

import { colors } from '../Diagram/config';

const tableTitle = (
  <li className={s.rowHeader}>
    <p className={s.tableHeader}>Categories</p>
    <p className={s.tableHeader}>Amount</p>
  </li>
);

const Table = ({ data, totalCosts, totalIncome, width }) => {
  return (
    <div className={s.tableWrap}>
      <ul className={s.table}>
        {(width < 768 || width >= 1024) && tableTitle}
        {data.map((item, index) => {
          const color = { backgroundColor: colors[index] };
          return (
            // eslint-disable-next-line no-underscore-dangle
            <li className={s.row} key={item._id || newId()}>
              <div className={s.categoryWrap}>
                <div className={s.square} style={color} />
                <p className={s.cellCategory}>{item.category}</p>
              </div>
              <p className={s.cell}>{item.amount}</p>
            </li>
          );
        })}
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
  data: PropTypes.arrayOf(PropTypes.object),
  totalCosts: PropTypes.number,
  totalIncome: PropTypes.number,
  width: PropTypes.number.isRequired
};

export default Table;
