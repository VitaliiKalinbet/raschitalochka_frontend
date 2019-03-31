import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noScroll from 'no-scroll';
import Loader from 'react-loader-spinner';
import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

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

// const colorsClasses = [
//   s.colorFirst,
//   s.colorSecond,
//   s.colorThird,
//   s.colorFourth,
//   s.colorFifth,
//   s.colorSixth,
//   s.colorSeventh,
//   s.colorEighth,
//   s.colorNinth
// ];

// const randomClassOfColor = () => colorsClasses[Math.floor(Math.random() * colorsClasses.length)];

const colorDependingOnTheCategory = category => {
  switch (category) {
    case 'regular income':
      return s.colorRegularIncome;
    case 'irregular income':
      return s.colorIrregularIncome;
    case 'food':
      return s.colorFood;
    case 'car':
      return s.colorCar;
    case 'main expenses':
      return s.colorMainExpenses;
    case 'entertainment':
      return s.colorEntertainment;
    case 'self care':
      return s.colorSelfCare;
    case 'child care':
      return s.colorChildCare;
    case 'household products':
      return s.colorHouseholdProducts;
    case 'education':
      return s.colorEducation;
    case 'other expenses':
      return s.colorOtherExpenses;
    default:
      return '';
  }
};

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
    const { data } = this.props;

    return (
      <div className={s.wrap}>
        <div className={s.btnsBlock}>
          <Button style={`${s.btn} ${s.btnLeft}`} value="Add Income" onClick={this.handleOpenModalIncome} />
          <Button style={s.btn} value="Add Cost" onClick={this.handleOpenModalCost} />
        </div>
        <div>
          <table className={s.table}>
            <tbody>
              <tr className={s.mainRow}>
                <th className={s.firstCol}>Date</th>
                <th className={s.typeCol}>Type</th>
                <th className={s.categoryCol}>Category</th>
                <th className={s.commentCol}>Comments</th>
                <th className={s.amountCol}>Amount, UAH</th>
                <th className={s.lastCol}>Balance After</th>
              </tr>
              {data.length > 0 ? (
                data.map((item, idx) => {
                  const date = createDate(item.date);
                  return (
                    <tr
                      key={item.date}
                      className={`${checkIdx(idx)} ${colorDependingOnTheCategory(item.category.toLowerCase())}`}
                    >
                      <td className={`${s.firstColContent} ${idx % 2 !== 0 && s.mobileCell}`}>
                        <div className={s.firstColContentForMobile}>
                          <div className={s.mobileTh}>{item.category}</div>
                          <div className={checkType(item.type)}>{`${item.type}${item.amount}`}</div>
                        </div>
                        <div className={s.mobileContent}>{date}</div>
                      </td>
                      <td className={`${s.typeColContent} ${s.noMobile}`}>
                        <div className={s.mobileTh}>Type</div>
                        <div className={s.mobileContent}>{item.type}</div>
                      </td>
                      <td className={`${s.categoryColContent} ${s.noMobile}`}>
                        <div className={s.mobileTh}>Category</div>
                        <div className={s.mobileContent}>{item.category}</div>
                      </td>
                      <td className={`${s.commentColContent} ${s.noMobile}`}>
                        <div className={s.mobileTh}>Comments</div>
                        <div className={s.mobileContent}>{item.comments}</div>
                      </td>
                      <td className={`${s.amountColContent} ${checkType(item.type)} ${s.noMobile}`}>
                        <div className={s.mobileTh}>Amount, UAH</div>
                        <div className={s.mobileContent}>{item.amount}</div>
                      </td>
                      <td className={`${s.lastColContent} ${s.noMobile}`}>
                        <div className={s.mobileTh}>Balance After</div>
                        <div className={s.mobileContent}>{item.balanceAfter}</div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>
                    <div className={s.loader}>
                      <Loader type="Oval" color="grey" height={80} width={80} />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isModalIncomeOpen && <ModalIncome handleCloseClick={this.handleCloseModalIncome} />}
        {isModalCostOpen && <ModalCost handleCloseClick={this.handleCloseModalCost} />}
      </div>
    );
  }
}

Home.defaultProps = {
  data: []
};

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};

const mapState = state => ({
  user: getUser(state),
  token: getToken(state)
});

export default connect(mapState)(Home);

// export default Home;
