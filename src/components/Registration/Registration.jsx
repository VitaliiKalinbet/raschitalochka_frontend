import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './Registration.module.css';

const INITIAL_STATE = {
  login: '',
  password: '',
  reEnterPassword: '',
  name: ''
};

class Registration extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => null;

  render() {
    const { login, password, reEnterPassword, name } = this.state;

    return (
      <form className={styles.main} onSubmit={this.handleSubmit}>
        <div className={styles.title}>Registration</div>
        <input
          className={styles.input}
          type="text"
          name="login"
          value={login}
          onChange={this.handleChange}
          placeholder="E-mail as Login"
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
          placeholder="Password"
        />
        <input
          className={styles.input}
          type="password"
          name="reEnterPassword"
          value={reEnterPassword}
          onChange={this.handleChange}
          placeholder="Password Confirmation"
        />
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          placeholder="Your Name"
        />
        <Button style={styles.submitButton} type="button" value="Register" />
        <Link className={styles.link} to="/login">
          Login
        </Link>
      </form>
    );
  }
}

export default Registration;
