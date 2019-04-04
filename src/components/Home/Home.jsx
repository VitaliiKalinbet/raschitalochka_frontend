import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import noScroll from 'no-scroll';
import Loader from 'react-loader-spinner';
import newId from 'uuid/v4';

import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

import Button from '../Button/Button';
import ModalIncome from '../ModalIncome/ModalIncome';
import ModalCost from '../ModalCost/ModalCost';

import s from './Home.module.css';

// const checkMinus = item => (String().includes('-') && item.type === '-' ? item.balanceAfter : `-${item.balanceAfter}`);
const checkMinus = item => (item.typeBalanceAfter === '-' ? Number(`-${item.balanceAfter}`) : item.balanceAfter);

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
    // const { data } = this.props;
    this.state = {
      // sortedData: data,
      isModalIncomeOpen: false,
      isModalCostOpen: false
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const change = nextProps.data !== nextState.sortedData;
  //   const { isModalCostOpen } = this.state
  //   if (nextState.isModalCostOpen !== isModalCostOpen) return true
  //   // console.log('should: ', nextProps, nextState);
  //   return change;
  // }

  handleOpenModalIncome = () => {
    this.setState(
      {
        isModalIncomeOpen: true
      }
      // () => noScroll.off()
    );
    // noScroll.on();
  };

  handleCloseModalIncome = () => {
    this.setState(
      {
        isModalIncomeOpen: false
      }
      // () => noScroll.off()
    );
  };

  handleOpenModalCost = () => {
    console.log('click Modal Cost');
    this.setState(
      {
        isModalCostOpen: true
      }
      // () => noScroll.on()
    );

    console.log('click2 Modal Cost');
  };

  handleCloseModalCost = () => {
    this.setState(
      {
        isModalCostOpen: false
      }
      // () => noScroll.off()
    );
  };

  render() {
    const { isModalIncomeOpen, isModalCostOpen } = this.state;
    const { data, addToData, setTotalBalance, totalBalance } = this.props;
    console.log('home render');
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
                      // eslint-disable-next-line no-underscore-dangle
                      key={item._id || newId()}
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
