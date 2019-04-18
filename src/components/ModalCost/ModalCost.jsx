import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DatePicker from '../DatePicker/DatePicker';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

import Arrow from '../../assets/images/arrow.svg';
import Button from '../Button/Button';

import * as API from '../../services/api';

import s from './ModalCost.module.css';

const checkFirstZero = str => (str[0] === '0' ? str.slice(1) : str);

const INITIAL_STATE = {
  date: new Date(),
  updateDate: null,
  category: '',
  amount: '',
  comments: '',
  balanceAfter: 0
};

const typeAndBalanceOfModal = (totalBalance, amount) => ({
  type: '-',
  balanceAfter: totalBalance - amount
});
class Modal extends Component {
  backdropRef = createRef();

  state = { ...INITIAL_STATE };

  componentDidMount() {
    window.addEventListener('click', this.handleBackdropClick);
    window.addEventListener('keydown', this.handleEscapeDown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleBackdropClick);
    window.removeEventListener('keydown', this.handleEscapeDown);
  }

  handleAmountAndCommentChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: name === 'amount' ? checkFirstZero(value) : value
    });
  };

  handleBtnClick = () => {
    const { handleCloseClick } = this.props;

    handleCloseClick();
  };

  handleChangeDate = e => {
    this.setState({
      updateDate: new Date(e.valueOf())
    });
  };

  handleCategoryChange = ({ target: { value } }) => {
    this.setState({
      category: value
    });
  };

  handleEscapeDown = ({ code }) => {
    const { handleCloseClick } = this.props;

    if (code !== 'Escape') return;

    handleCloseClick();
  };

  handleBackdropClick = ({ target }) => {
    const { handleCloseClick } = this.props;

    if (this.backdropRef.current !== target) return;

    handleCloseClick();
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { handleCloseClick, user, token, addToData, totalBalance } = this.props;
    const { amount, updateDate, category, comments } = this.state;
    const intAmount = Number(amount);
    const dateInMilliseconds = (updateDate && updateDate.getTime()) || new Date().getTime();
    const type = {
      type: '-'
    };

    const finance = {
      category,
      comments,
      amount: intAmount,
      ...typeAndBalanceOfModal(totalBalance, intAmount),
      ...{ date: dateInMilliseconds },
      ...{ createdAt: new Date().getTime() }
    };

    const newBalance = totalBalance - intAmount;

    const balanceAfter = newBalance > 0 ? newBalance : Math.abs(newBalance);
    const typeBalanceAfter = newBalance > 0 ? '+' : '-';
    const financeOut = {
      ...this.state,
      ...{ date: dateInMilliseconds },
      ...type,
      balanceAfter,
      typeBalanceAfter
    };
    addToData(finance, typeBalanceAfter, newBalance);

    API.postIncomeAndCosts(user.id, token, financeOut)
      .then(() => {})
      .catch(error => console.log('err', error));

    this.setState({ ...INITIAL_STATE });
    handleCloseClick();
  };

  validDate = current => {
    const { user } = this.props;
    return current.valueOf() >= new Date(user.createdAt);
  };

  render() {
    const { handleSubmitForm } = this.props;
    const { date, updateDate, category, amount, comments } = this.state;
    const hight = window.innerHeight < 565 ? s.hight : null;
    return (
      <div className={s.backdrop} ref={this.backdropRef} onSubmit={handleSubmitForm}>
        <div className={s.modal}>
          <div className={s.wrapBtn}>
            <button type="button" className={s.arrowBtn} onClick={this.handleBtnClick}>
              <div className={s.wrapArrow}>
                <img src={Arrow} alt="arrow" className={s.arrow} />
              </div>
              <h2 className={s.titleArrow}>Add Cost</h2>
            </button>
          </div>

          <h2 className={s.title}>Add Cost</h2>

          <form onSubmit={this.handleFormSubmit} className={`${s.form} ${hight}`}>
            <input
              type="number"
              className={s.amountInp}
              placeholder="Amount.00"
              value={amount}
              name="amount"
              pattern="[0-9]+([\.,][0-9]+)?"
              step="1.00"
              onChange={this.handleAmountAndCommentChange}
              autoFocus
              required
            />

            {/* <DatePicker style={s.dateInp} date={date} onChange={this.handleChangeDate} clearIcon={null} /> */}
            {/* <DatePicker date={updateDate || date} onChange={this.handleChangeDate} clearIcon={null} /> */}
            <div className={s.datetime}>
              <Datetime
                dateFormat="DD.MM.YYYY"
                isValidDate={this.validDate}
                onChange={this.handleChangeDate}
                defaultValue={updateDate || date}
              />
            </div>
            <h3 className={s.subtitle}>Category</h3>

            <label htmlFor="radioMain" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioMain"
                name="category"
                value="Main Expenses"
                checked={category === 'Main Expenses'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Main Expenses</p>
            </label>

            <label htmlFor="radioFood" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioFood"
                name="category"
                value="Food"
                checked={category === 'Food'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Food</p>
            </label>

            <label htmlFor="radioCar" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioCar"
                name="category"
                value="Car"
                checked={category === 'Car'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Car</p>
            </label>

            <label htmlFor="radioEntertainment" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioEntertainment"
                name="category"
                value="Entertainment"
                checked={category === 'Entertainment'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Entertainment</p>
            </label>

            <label htmlFor="radioSelf" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioSelf"
                name="category"
                value="Self Care"
                checked={category === 'Self Care'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Self Care</p>
            </label>

            <label htmlFor="radioChild" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioChild"
                name="category"
                value="Child Care"
                checked={category === 'Child Care'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Child Care</p>
            </label>

            <label htmlFor="radioHousehold" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioHousehold"
                name="category"
                value="Household Products"
                checked={category === 'Household Products'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Household Products</p>
            </label>

            <label htmlFor="radioEducation" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioEducation"
                name="category"
                value="Education"
                checked={category === 'Education'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Education</p>
            </label>

            <label htmlFor="radioOther" className={s.radioLast}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioOther"
                name="category"
                value="Other Expenses"
                checked={category === 'Other Expenses'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Other Expenses</p>
            </label>

            <h3 className={s.subtitle}>Comments</h3>

            <textarea
              className={s.text}
              onChange={this.handleAmountAndCommentChange}
              name="comments"
              value={comments}
              placeholder="Your comment"
              maxLength="56"
            />

            <Button style={s.btn} type="submit" value="Add" />
          </form>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  user: null,
  token: null,
  handleSubmitForm: () => null,
  handleCloseClick: () => null
};

Modal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string
  }),
  token: PropTypes.string,
  handleSubmitForm: PropTypes.func,
  handleCloseClick: PropTypes.func,
  addToData: PropTypes.func.isRequired,
  totalBalance: PropTypes.number.isRequired
};

const mapState = state => ({
  user: getUser(state),
  token: getToken(state)
});

export default connect(
  mapState,
  null
)(Modal);
