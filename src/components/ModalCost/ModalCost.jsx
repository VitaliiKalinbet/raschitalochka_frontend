import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from '../DatePicker/DatePicker';

import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

import Arrow from '../../assets/images/arrow.svg';
import Button from '../Button/Button';

import * as API from '../../services/api';

import s from './ModalCost.module.css';

const INITIAL_STATE = {
  date: new Date(),
  category: '',
  amount: null,
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
      [name]: name === 'amount' ? Number(value) : value
    });
  };

  handleBtnClick = () => {
    const { handleCloseClick } = this.props;

    handleCloseClick();
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
    const { handleCloseClick, user, token, setTotalBalance, addToData, totalBalance } = this.props;
    const { amount, date } = this.state;
    const dateInMilliseconds = date.getTime();

    const type = {
      type: '-'
    };

    const finance = { ...this.state, ...typeAndBalanceOfModal(totalBalance, amount), ...{ date: dateInMilliseconds } };

    const newBalance = totalBalance - amount;

    const balanceOut = newBalance > 0 ? newBalance : Math.abs(newBalance);
    console.log(totalBalance, amount);

    console.log(balanceOut);

    const financeOut = { ...this.state, ...{ date: dateInMilliseconds }, ...type, balanceAfter: balanceOut };
    // console.log(finance);
    setTotalBalance(finance.type, newBalance);
    addToData(finance);

    API.postIncomeAndCosts(user.id, token, financeOut)
      .then(() => {
        // console.log('then', finance.type, finance.amount, data.finance.data);
        // res.data.finance.data;
        // console.log(data, 'dataaaaa');
        // console.log(finance.balanceAfter, 'balance');
        // const newBalance = type === '+' ? totalBalance + finance.balanceAfter : totalBalance - finance.balanceAfter;
      })
      // .then((res) =>  )
      .catch(error => console.log('err', error));

    this.setState({ ...INITIAL_STATE });
    handleCloseClick();
  };

  render() {
    const { handleSubmitForm } = this.props;
    const { date, category, amount, comments } = this.state;

    const btnMobile = () => (
      <>
        <div className={s.wrapArrow}>
          <img src={Arrow} alt="arrow" className={s.arrow} />
        </div>
        <h2 className={s.titleArrow}>Add Cost</h2>
      </>
    );

    return (
      <div className={s.backdrop} ref={this.backdropRef} onSubmit={handleSubmitForm}>
        <div className={s.modal}>
          <div className={s.wrapBtn}>
            <Button type="button" style={s.arrowBtn} value={btnMobile()} onClick={this.handleBtnClick} />
          </div>

          <h2 className={s.title}>Add Cost</h2>

          <form onSubmit={this.handleFormSubmit} className={s.form}>
            <input
              type="number"
              className={s.amountInp}
              placeholder="Amount.00"
              value={amount}
              name="amount"
              pattern="[0-9]+([\.,][0-9]+)?"
              step="1.00"
              onChange={this.handleAmountAndCommentChange}
              required
            />

            <DatePicker style={s.dateInp} selected={date} onChange={this.handleChangeDate} clearIcon={null} />

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
              required
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
    name: PropTypes.string
  }),
  token: PropTypes.string,
  handleSubmitForm: PropTypes.func,
  handleCloseClick: PropTypes.func,
  addToData: PropTypes.func.isRequired,
  setTotalBalance: PropTypes.func.isRequired,
  totalBalance: PropTypes.number.isRequired
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
