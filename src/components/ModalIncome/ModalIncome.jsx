import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DatePicker from '../DatePicker/DatePicker';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import Arrow from '../../assets/images/arrow.svg';
import Button from '../Button/Button';

import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';
import * as API from '../../services/api';

import s from './ModalIncome.module.css';

const INITIAL_STATE = {
  date: new Date(),
  updateDate: null,
  category: '',
  amount: '',
  comments: ''
};

const checkFirstZero = str => (str[0] === '0' ? Number(str.slice(1)) : Number(str));

const typeAndBalanceOfModal = (prevBalance, amount) => ({
  type: '+',
  balanceAfter: prevBalance + amount
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

  handleBtnClick = () => {
    const { handleCloseClick } = this.props;

    handleCloseClick();
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
    const { handleCloseClick, user, token, totalBalance, addToData } = this.props;
    const { amount, updateDate, category, comments } = this.state;
    const intAmount = Number(amount);
    const dateInMilliseconds = (updateDate && updateDate.getTime()) || new Date().getTime();
    const type = {
      type: '+'
    };

    const newBalance = totalBalance + Number(amount);

    const finance = {
      category,
      comments,
      amount: intAmount,
      ...typeAndBalanceOfModal(totalBalance, Number(amount)),
      ...{ date: dateInMilliseconds },
      ...{ createdAt: new Date().getTime() }
    };

    const balanceAfter = newBalance > 0 ? newBalance : Math.abs(newBalance);
    const typeBalanceAfter = newBalance > 0 ? '+' : '-';
    const financeOut = {
      ...this.state,
      ...{ date: dateInMilliseconds },
      ...type,
      balanceAfter,
      typeBalanceAfter
    };

    addToData(finance, finance.type, newBalance);

    API.postIncomeAndCosts(user.id, token, financeOut).catch(error => console.log('err', error));
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
    return (
      <div className={s.backdrop} ref={this.backdropRef} onSubmit={handleSubmitForm}>
        <div className={s.modal}>
          <div className={s.wrapBtn}>
            <button type="button" className={s.arrowBtn} onClick={this.handleBtnClick}>
              <div className={s.wrapArrow}>
                <img src={Arrow} alt="arrow" className={s.arrow} />
              </div>
              <h2 className={s.titleArrow}>Add Income</h2>
            </button>
          </div>
          <h2 className={s.title}>Add Income</h2>

          <form onSubmit={this.handleFormSubmit} className={s.form}>
            <input
              type="number"
              className={s.amountInp}
              placeholder="Amount.00"
              value={amount}
              name="amount"
              onChange={this.handleAmountAndCommentChange}
              autoFocus
              required
            />
            {/* <DatePicker style={s.dateInp} date={date} onChange={this.handleChangeDate} /> */}
            <div className={s.datetime}>
              <Datetime
                dateFormat="DD.MM.YYYY"
                isValidDate={this.validDate}
                onChange={this.handleChangeDate}
                defaultValue={updateDate || date}
              />
            </div>
            <h3 className={s.subtitle}>Category</h3>

            <label htmlFor="radioFirst" className={s.radioTop}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioFirst"
                name="category"
                value="Regular Income"
                checked={category === 'Regular Income'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Regular Income</p>
            </label>
            <label htmlFor="radioSecond" className={s.radioBottom}>
              <input
                className={s.radioInp}
                type="radio"
                id="radioSecond"
                name="category"
                value="Irregular Income"
                checked={category === 'Irregular Income'}
                onChange={this.handleCategoryChange}
                required
              />
              <p>Irregular Income</p>
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
  totalBalance: 0,
  addToData: () => null,
  handleSubmitForm: () => null,
  handleCloseClick: () => null
};

Modal.propTypes = {
  addToData: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string
  }),
  token: PropTypes.string,
  handleSubmitForm: PropTypes.func,
  handleCloseClick: PropTypes.func,
  totalBalance: PropTypes.number
};

const mapState = state => ({
  user: getUser(state),
  token: getToken(state)
});

export default connect(
  mapState,
  null
)(Modal);
