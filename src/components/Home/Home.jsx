import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import newId from 'uuid/v4';
import { getTotalBalance, getFinanceData } from '../../redux/reducers/finance/financeSelectors';
import * as financeOperations from '../../redux/reducers/finance/financeOperations';
import Button from '../Button/Button';
import ModalIncome from '../ModalIncome/ModalIncome';
import ModalCost from '../ModalCost/ModalCost';
import s from './Home.module.css';

const checkMinus = item => (item.typeBalanceAfter === '-' ? Number(`-${item.balanceAfter}`) : item.balanceAfter);
const addFixed = (incomeOpen, costOpen) => {
  if (incomeOpen || costOpen) return s.fixed;
  return null;
};

const createDate = mill => {
  const date = new Date(mill);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const currentMonth = date.getMonth() + 1;
  const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  const year = date
    .getYear()
    .toString()
    .split('')
    .slice(1)
    .join('');
  return `${day}.${month}.20${year}`;
};

const colorDependingOnTheCategory = category => {
  const lowerCaseCategory = toString(category).toLowerCase();
  switch (lowerCaseCategory) {
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
    this.state = {
      isModalIncomeOpen: false,
      isModalCostOpen: false
      // data: this.props.data
    };
  }

  componentDidMount() {
    const { data = [] } = this.props;
    if (data.length === 0) this.setState({ isModalIncomeOpen: true });
  }

  handleOpenModalIncome = () => {
    this.setState({
      isModalIncomeOpen: true
    });
  };

  handleCloseModalIncome = () => {
    this.setState({
      isModalIncomeOpen: false
    });
  };

  handleOpenModalCost = () => {
    this.setState({
      isModalCostOpen: true
    });
  };

  handleCloseModalCost = () => {
    this.setState({
      isModalCostOpen: false
    });
  };

  render() {
    const { isModalIncomeOpen, isModalCostOpen } = this.state;
    const { data, addToData, totalBalance } = this.props;
    const sortedData = [...data].sort((a, b) => (a.date > b.date ? -1 : 1));
    return (
      <div className={`${s.wrap} ${addFixed(isModalIncomeOpen, isModalCostOpen)}`}>
        <div className={s.btnsBlock}>
          <Button style={`${s.btn} ${s.btnLeft}`} value="Add Income" onClick={this.handleOpenModalIncome} />
          <Button style={s.btn} value="Add Cost" onClick={this.handleOpenModalCost} />
        </div>
        <>
          <div className={s.table}>
            <>
              <div className={s.mainRow}>
                <div className={s.firstCol}>Date</div>
                <div className={s.typeCol}>Type</div>
                <div className={s.categoryCol}>Category</div>
                <div className={s.commentCol}>Comments</div>
                <div className={s.amountCol}>Amount, UAH</div>
                <div className={s.lastCol}>Balance After</div>
              </div>
              <div className={s.tableScroll}>
                {sortedData.length > 0 ? (
                  sortedData.map((item, idx) => {
                    const date = createDate(item.date);
                    return (
                      <div
                        // eslint-disable-next-line no-underscore-dangle
                        key={item._id || newId()}
                        className={`${checkIdx(idx)} ${colorDependingOnTheCategory(item.category)}`}
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
                  <p className={s.addTransaction}>
                    Please deposit current balance by clicking on the add income button (above)
                  </p>
                )}
              </div>
            </>
          </div>
        </>

        {isModalIncomeOpen && (
          <ModalIncome
            totalBalance={totalBalance}
            addToData={addToData}
            handleCloseClick={this.handleCloseModalIncome}
          />
        )}
        {isModalCostOpen && (
          <ModalCost totalBalance={totalBalance} addToData={addToData} handleCloseClick={this.handleCloseModalCost} />
        )}
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToData: PropTypes.func.isRequired,
  totalBalance: PropTypes.number.isRequired
};

const mapState = state => ({
  totalBalance: getTotalBalance(state),
  data: getFinanceData(state)
});

const mapDispatch = {
  addToData: financeOperations.addToData
};

export default connect(
  mapState,
  mapDispatch
)(Home);
