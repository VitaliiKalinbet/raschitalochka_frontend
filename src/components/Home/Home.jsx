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

// const obj = [
//   {
//     comments: 'get money by my Job',
//     _id: '5c9b9b2c89460c4c9fbaccc7',
//     date: 1553699509960,
//     type: '+',
//     category: 'Regular Income',
//     amount: 20000,
//     balanceAfter: 20000,
//     updatedAt: '2019-03-27T15:47:56.416Z',
//     createdAt: '2019-03-27T15:47:56.416Z'
//   },
//   {
//     comments: 'get money by my Job',
//     _id: '5c9b9b5689460c4c9fbaccc8',
//     date: 1553699509960,
//     type: '+',
//     category: 'Irregular Income',
//     amount: 1000,
//     balanceAfter: 21000,
//     updatedAt: '2019-03-27T15:48:38.426Z',
//     createdAt: '2019-03-27T15:48:38.426Z'
//   },
//   {
//     comments: 'some food',
//     _id: '5c9b9b8e89460c4c9fbaccc9',
//     date: 1553701765195,
//     type: '-',
//     category: 'Food',
//     amount: 1000,
//     balanceAfter: 20000,
//     updatedAt: '2019-03-27T15:49:34.467Z',
//     createdAt: '2019-03-27T15:49:34.467Z'
//   },
//   {
//     comments: 'my car',
//     _id: '5c9b9bd889460c4c9fbaccca',
//     date: 1553701814284,
//     type: '-',
//     category: 'Car',
//     amount: 1000,
//     balanceAfter: 19000,
//     updatedAt: '2019-03-27T15:50:48.272Z',
//     createdAt: '2019-03-27T15:50:48.272Z'
//   },
//   {
//     comments: 'some minus',
//     _id: '5c9b9c0a89460c4c9fbacccb',
//     date: 1553701875750,
//     type: '-',
//     category: 'Main Expenses',
//     amount: 1000,
//     balanceAfter: 18000,
//     updatedAt: '2019-03-27T15:51:38.575Z',
//     createdAt: '2019-03-27T15:51:38.575Z'
//   },
//   {
//     comments: 'Entertainment minus',
//     _id: '5c9b9c3689460c4c9fbacccc',
//     date: 1553701927948,
//     type: '-',
//     category: 'Entertainment',
//     amount: 1000,
//     balanceAfter: 17000,
//     updatedAt: '2019-03-27T15:52:22.828Z',
//     createdAt: '2019-03-27T15:52:22.828Z'
//   },
//   {
//     comments: 'Self Care minus',
//     _id: '5c9b9c6389460c4c9fbacccd',
//     date: 1553701971966,
//     type: '-',
//     category: 'Self Care',
//     amount: 1000,
//     balanceAfter: 16000,
//     updatedAt: '2019-03-27T15:53:07.325Z',
//     createdAt: '2019-03-27T15:53:07.325Z'
//   },
//   {
//     comments: 'Child Care minus',
//     _id: '5c9b9c9d89460c4c9fbaccce',
//     date: 1553702022746,
//     type: '-',
//     category: 'Child Care',
//     amount: 500,
//     balanceAfter: 15500,
//     updatedAt: '2019-03-27T15:54:05.715Z',
//     createdAt: '2019-03-27T15:54:05.715Z'
//   },
//   {
//     comments: 'Household Products minus',
//     _id: '5c9b9cca89460c4c9fbacccf',
//     date: 1553702077595,
//     type: '-',
//     category: 'Household Products',
//     amount: 500,
//     balanceAfter: 15000,
//     updatedAt: '2019-03-27T15:54:50.756Z',
//     createdAt: '2019-03-27T15:54:50.756Z'
//   },
//   {
//     comments: 'Education Products minus',
//     _id: '5c9b9cfc89460c4c9fbaccd0',
//     date: 1553702123974,
//     type: '-',
//     category: 'Education',
//     amount: 500,
//     balanceAfter: 14500,
//     updatedAt: '2019-03-27T15:55:40.264Z',
//     createdAt: '2019-03-27T15:55:40.264Z'
//   },
//   {
//     comments: 'Other Expenses minus',
//     _id: '5c9b9d2f89460c4c9fbaccd1',
//     date: 1553702179952,
//     type: '-',
//     category: 'Other Expenses',
//     amount: 2000,
//     balanceAfter: 12500,
//     updatedAt: '2019-03-27T15:56:31.610Z',
//     createdAt: '2019-03-27T15:56:31.610Z'
//   },
//   {
//     comments: 'some comment text',
//     _id: '5c9ba7b689460c4c9fbaccd2',
//     date: 1553704845255,
//     type: '+',
//     category: 'Irregular Income',
//     amount: 100,
//     balanceAfter: 12600,
//     updatedAt: '2019-03-27T16:41:26.560Z',
//     createdAt: '2019-03-27T16:41:26.560Z'
//   }
// ];

const checkMinus = item =>
  String(item.balanceAfter).includes('-') && item.type === '-' ? item.balanceAfter : `-${item.balanceAfter}`;

const createDate = mill => {
  const date = new Date(mill);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth();
  const year = date
    .getYear()
    .toString()
    .split('')
    .slice(1)
    .join('');

  return `${day}.${month}.20${year}`;
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
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      sortedData: data,
      isModalIncomeOpen: false,
      isModalCostOpen: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const change = nextProps.data !== nextState.sortedData;
    return change;
  }

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
    const { data, addToData, setTotalBalance, totalBalance } = this.props;
    // console.log(sortedData);
    // console.log(data);
    return (
      <div className={s.wrap}>
        <div className={s.btnsBlock}>
          <Button style={`${s.btn} ${s.btnLeft}`} value="Add Income" onClick={this.handleOpenModalIncome} />
          <Button style={s.btn} value="Add Cost" onClick={this.handleOpenModalCost} />
        </div>
        <div>
          <div className={s.table}>
            <div>
              <div className={s.mainRow}>
                <div className={s.firstCol}>Date</div>
                <div className={s.typeCol}>Type</div>
                <div className={s.categoryCol}>Category</div>
                <div className={s.commentCol}>Comments</div>
                <div className={s.amountCol}>Amount, UAH</div>
                <div className={s.lastCol}>Balance After</div>
              </div>
              {data.length > 0 ? (
                data.map((item, idx) => {
                  const date = createDate(item.date);
                  return (
                    <div
                      key={item.date}
                      className={`${checkIdx(idx)} ${colorDependingOnTheCategory(item.category.toLowerCase())}`}
                    >
                      <div className={`${s.firstColContent} ${idx % 2 !== 0 && s.mobileCell}`}>
                        <div className={s.firstColContentForMobile}>
                          <div className={s.mobileTh}>{item.category}</div>
                          <div className={s.mobileThRight}>
                            <div>{item.comments}</div>
                            <div className={checkType(item.type)}>{`${item.type}${item.amount}`}</div>
                          </div>
                        </div>
                        <div className={s.mobileContent}>{date}</div>
                      </div>
                      <div className={`${s.typeColContent} ${s.noMobile}`}>
                        <div className={s.mobileContent}>{item.type}</div>
                      </div>
                      <div className={`${s.categoryColContent} ${s.noMobile}`}>
                        <div className={s.mobileContent}>{item.category}</div>
                      </div>
                      <div className={`${s.commentColContent} ${s.noMobile}`}>
                        <div className={s.mobileContent}>{item.comments}</div>
                      </div>
                      <div className={`${s.amountColContent} ${checkType(item.type)} ${s.noMobile}`}>
                        <div className={s.mobileContent}>{item.amount}</div>
                      </div>
                      <div className={`${s.lastColContent} ${s.noMobile}`}>
                        <div className={s.mobileContent}>{checkMinus(item)}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div>
                    <div className={s.loader}>
                      <Loader type="Oval" color="grey" height={80} width={80} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isModalIncomeOpen && (
          <ModalIncome
            totalBalance={totalBalance}
            addToData={addToData}
            setTotalBalance={setTotalBalance}
            handleCloseClick={this.handleCloseModalIncome}
          />
        )}
        {isModalCostOpen && (
          <ModalCost
            totalBalance={totalBalance}
            addToData={addToData}
            setTotalBalance={setTotalBalance}
            handleCloseClick={this.handleCloseModalCost}
          />
        )}
      </div>
    );
  }
}

Home.defaultProps = {
  data: []
};

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  addToData: PropTypes.func.isRequired,
  setTotalBalance: PropTypes.func.isRequired,
  totalBalance: PropTypes.number.isRequired
};

const mapState = state => ({
  user: getUser(state),
  token: getToken(state)
});

export default connect(mapState)(Home);

// export default Home;
