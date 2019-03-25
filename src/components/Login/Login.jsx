import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import s from './Login.module.css';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
  };

  handleChange = e => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className={s.formWrapper}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <h3 className={s.formTitle}>Raschitalochka</h3>
          <input
            className={s.input}
            name="email"
            placeholder="E-mail as Login"
            type="email"
            value={email}
            required
            autoComplete="email"
            onChange={this.handleChange}
          />
          <input
            className={s.input}
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            required
            autoComplete="new-password"
            onChange={this.handleChange}
          />
          <button className={s.submitBtn} type="submit">
            Enter
          </button>
          <NavLink className={s.registerLink} activeClassName={s.activeLink} to="/registration">
            Register
          </NavLink>
        </form>
      </div>
    );
  }
}

export default Login;
