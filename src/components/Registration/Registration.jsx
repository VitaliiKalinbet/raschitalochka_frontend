import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './Registration.module.css';
import emailIco from './email.svg';
import passwordIco from './lock.svg';
import accountIco from './user-account-box.svg';

const INITIAL_STATE = {
  login: '',
  password: '',
  reEnterPassword: '',
  name: '',
  lineState: 0
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

  handleSubmit = e => {
    e.preventDefault();
    const { lineState } = this.state;
    if (lineState !== 1) alert('Паролі не рівні!!!');
  };

  render() {
    const { login, password, reEnterPassword, name, lineState } = this.state;

    return (
      <form className={styles.main} onSubmit={this.handleSubmit}>
        <div className={styles.title}>Registration</div>
        <label htmlFor="login" className={styles.label}>
          <input
            className={styles.input}
            type="text"
            name="login"
            value={login}
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
        <Button style={styles.submitButton} type="button" value="Register" />
        <Link className={styles.link} to="/login">
          Login
        </Link>
      </form>
    );
  }
}

export default Registration;
