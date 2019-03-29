import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import { register } from '../../services/api';
import emailIco from './email.svg';
import passwordIco from './lock.svg';
import accountIco from './user-account-box.svg';
import closeIcon from './close.svg';

import styles from './Registration.module.css';

const INITIAL_STATE = {
  email: '',
  password: '',
  reEnterPassword: '',
  name: '',
  lineState: 0,
  errorMsg: '',
  successMsg: ''
};

class Registration extends Component {
  state = { ...INITIAL_STATE };

  handleCheckPasswords = () => {
    const { password, reEnterPassword } = this.state;
    if (password.length >= 5 || reEnterPassword.length >= 5) {
      this.setState({ lineState: 0.5 });
    }

    if (password.length >= 5 && reEnterPassword.length >= 5 && password === reEnterPassword) {
      this.setState({ lineState: 1 });
    }

    if (password.length <= 5 && reEnterPassword.length <= 5) {
      this.setState({ lineState: 0 });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value
      },
      () => this.handleCheckPasswords()
    );
  };

  handleCloseErrorMsg = () => {
    return this.setState({ errorMsg: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, name, lineState } = this.state;
    const { handSuccesRedirectyToLogin } = this.props;
    if (!email || !password || !name) {
      return this.setState({ errorMsg: 'Please fill all fields' });
    }

    if (lineState !== 1) {
      return this.setState({ errorMsg: 'Passwords are not equals, please check it and try again' });
    }

    this.setState({ errorMsg: '', successMsg: 'Successfully created new user and his Finance Data. You can Login' });

    const data = JSON.stringify({ name, email, password });

    return register(data)
      .then(response => {
        if (response.status === 200) {
          const { message } = response.data;
          this.setState({ successMsg: message });

          setTimeout(() => {
            return handSuccesRedirectyToLogin();
          }, 2000);
        }
      })
      .catch(error => this.setState({ errorMsg: error.message }));
  };

  render() {
    const { email, password, reEnterPassword, name, lineState, errorMsg, successMsg } = this.state;

    return (
      <form className={styles.main} onSubmit={this.handleSubmit}>
        <div className={styles.title}>Registration</div>
        <label htmlFor="email" className={styles.label}>
          <input
            className={styles.input}
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="E-mail as Login"
          />
          <img className={styles.icon} src={emailIco} alt="email icon" />
        </label>
        <label htmlFor="password" className={styles.label}>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <img className={styles.icon} src={passwordIco} alt="password icon" />
        </label>
        <label htmlFor="reEnterPassword" className={styles.label}>
          <input
            className={styles.input}
            type="password"
            name="reEnterPassword"
            value={reEnterPassword}
            onChange={this.handleChange}
            placeholder="Password Confirmation"
          />
          <img className={styles.icon} src={passwordIco} alt="password icon" />
        </label>
        {/* eslint-disable-next-line */}
        <div className={lineState === 0 ? styles.lineStatus : lineState === 0.5 ? styles.halfLine : styles.fullLine} />
        <label htmlFor="name" className={styles.label}>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Your Name"
          />
          <img className={styles.icon} src={accountIco} alt="account icon" />
        </label>
        <Button style={styles.submitButton} type="submit" value="Register" />
        <Link className={styles.link} to="/login">
          Login
        </Link>
        {errorMsg && (
          <div className={styles.errorMsg}>
            {errorMsg}
            <img
              role="presentation"
              onClick={this.handleCloseErrorMsg}
              onKeyDown={() => null}
              className={styles.closeIcon}
              src={closeIcon}
              alt="closeIcon"
            />
          </div>
        )}
        {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
      </form>
    );
  }
}

Registration.defaultProps = {
  handSuccesRedirectyToLogin: () => null
};

Registration.propTypes = {
  handSuccesRedirectyToLogin: PropTypes.func
};

export default Registration;
