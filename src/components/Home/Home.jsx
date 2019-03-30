import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import noScroll from 'no-scroll';

import Button from '../Button/Button';
import ModalIncome from '../ModalIncome/ModalIncome';
import ModalCost from '../ModalCost/ModalCost';

import s from './Home.module.css';

const createDate = mill => {
  const date = new Date(mill);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date
    .getYear()
    .toString()
    .split('')
    .slice(1)
    .join('');

  return `${day}.${month}.${year}`;
};

const colorsClasses = [s.colorFirst, s.colorSecond, s.colorThird, s.colorFourth, s.colorFifth];

const randomClassOfColor = () => colorsClasses[Math.floor(Math.random() * colorsClasses.length)];

const checkType = type => {
  return type === '+' ? s.amountPlus : s.amountMinus;
};

const checkIdx = idx => (idx % 2 === 0 ? s.contentRows : s.contentRowsSilver);

class Home extends Component {
  state = {
    isModalIncomeOpen: false,
    isModalCostOpen: false
  };

  handleOpenModalIncome = () => {
    this.setState({
      isModalIncomeOpen: true
    });
    noScroll.on();
  };

  handleCloseModalIncome = () => {
    this.setState({
      isModalIncomeOpen: false
    });
    noScroll.off();
  };

  handleOpenModalCost = () => {
    this.setState({
      isModalCostOpen: true
    });
    noScroll.on();
  };

  handleCloseModalCost = () => {
    this.setState({
      isModalCostOpen: false
    });
    noScroll.off();
  };

  render() {
    const { isModalIncomeOpen, isModalCostOpen } = this.state;
    // const { data } = this.props;
    const data = [];
    return (
      <div className={s.wrap}>
        <div className={s.btnsBlock}>
          <Button style={`${s.btn} ${s.btnLeft}`} value="Add Income" onClick={this.handleOpenModalIncome} />
          <Button style={s.btn} value="Add Cost" onClick={this.handleOpenModalCost} />
        </div>
        <div>
          <table className={s.table}>
            <tr className={s.mainRow}>
              <th className={s.firstCol}>Date</th>
              <th className={s.typeCol}>Type</th>
              <th className={s.categoryCol}>Category</th>
              <th className={s.commentCol}>Comments</th>
              <th className={s.amountCol}>Amount, UAH</th>
              <th className={s.lastCol}>Balance After</th>
            </tr>
            {data.length > 0 &&
              data.map((item, idx) => {
                const date = createDate(item.date);
                return (
                  <tr key={item.dateEvent} className={`${checkIdx(idx)} ${randomClassOfColor()}`}>
                    <td className={s.firstColContent}>
                      <div className={s.mobileTh}>Date</div>
                      <div className={s.mobileContent}>{date}</div>
                    </td>
                    <td className={s.typeColContent}>
                      <div className={s.mobileTh}>Type</div>
                      <div className={s.mobileContent}>{item.type}</div>
                    </td>
                    <td className={s.categoryColContent}>
                      <div className={s.mobileTh}>Category</div>
                      <div className={s.mobileContent}>{item.category}</div>
                    </td>
                    <td className={s.commentColContent}>
                      <div className={s.mobileTh}>Comments</div>
                      <div className={s.mobileContent}>{item.comments}</div>
                    </td>
                    <td className={`${s.amountColContent} ${checkType(item.type)}`}>
                      <div className={s.mobileTh}>Amount, UAH</div>
                      <div className={s.mobileContent}>{item.amount}</div>
                    </td>
                    <td className={s.lastColContent}>
                      <div className={s.mobileTh}>Balance After</div>
                      <div className={s.mobileContent}>{item.balanceAfter}</div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>

        {isModalIncomeOpen && <ModalIncome handleCloseClick={this.handleCloseModalIncome} />}
        {isModalCostOpen && <ModalCost handleCloseClick={this.handleCloseModalCost} />}
      </div>
    );
  }
}

export default Home;

// Home.propTypes = {
//   data: PropTypes.array
// };

// Home.defaultProps = {
//   data: []
// };
