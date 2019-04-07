import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from '../DatePicker/DatePicker';

import Arrow from '../../assets/images/arrow.svg';
import Button from '../Button/Button';

import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';
import * as API from '../../services/api';

import s from './ModalIncome.module.css';

const INITIAL_STATE = {
  date: new Date(),
  category: '',
  amount: '',
  comments: ''
};

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
      [name]: name === 'amount' ? Number(value) : value
    });
  };

  handleChangeDate = date => {
    this.setState({
      date
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
    const { handleCloseClick, user, token, totalBalance, addToData, setTotalBalance } = this.props;
    const { amount, date } = this.state;
    const dateInMilliseconds = date.getTime();
    const type = {
      type: '+'
    };

    const newBalance = totalBalance + amount;

    const finance = { ...this.state, ...typeAndBalanceOfModal(totalBalance, amount), ...{ date: dateInMilliseconds } };

    const balanceAfter = newBalance > 0 ? newBalance : Math.abs(newBalance);
    const typeBalanceAfter = newBalance > 0 ? '+' : '-';
    const financeOut = {
      ...this.state,
      ...{ date: dateInMilliseconds },
      ...type,
      balanceAfter,
      typeBalanceAfter
    };

    setTotalBalance(finance.type, newBalance);
    addToData(finance);

    API.postIncomeAndCosts(user.id, token, financeOut)
      .then(res => console.log('res', res))
      .catch(error => console.log('err', error));
    this.setState({ ...INITIAL_STATE });
    handleCloseClick();
  };

  render() {
    const { handleSubmitForm } = this.props;
    const { date, category, amount, comments } = this.state;
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
              required
            />
            <DatePicker style={s.dateInp} date={date} onChange={this.handleChangeDate} />

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
  setTotalBalance: () => null,
  addToData: () => null,
  handleSubmitForm: () => null,
  handleCloseClick: () => null
};

Modal.propTypes = {
  setTotalBalance: PropTypes.func,
  addToData: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string
  }),
  token: PropTypes.string,
  handleSubmitForm: PropTypes.func,
  handleCloseClick: PropTypes.func,
  totalBalance: PropTypes.number
  // addToData: PropTypes.func.isRequired,
  // setTotalBalance: PropTypes.func.isRequired
};

// export default Modal;

const mapState = state => ({
  user: getUser(state),
  token: getToken(state)
});

export default connect(
  mapState,
  null
)(Modal);
