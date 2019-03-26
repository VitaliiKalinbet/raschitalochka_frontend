import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import s from './Login.module.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    width: 800
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

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

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { email, password, width } = this.state;
    console.log(width);
    return (
      <div className={s.wrap}>
        <div className={s.bgWrap}>
          {width >= 768 && <p className={s.slogan}>Manage your budget with finance app</p>}
        </div>
        <div className={s.formWrapper}>
          <form className={s.form} onSubmit={this.handleSubmit}>
            <h3 className={s.formTitle}>Raschitalochka</h3>
            <div className={s.inputWithIcon}>
              <input
                className={s.inputEmail}
                name="email"
                placeholder="E-mail as Login"
                type="email"
                value={email}
                required
                onChange={this.handleChange}
              />
              <i className={s.iconEmail} />
            </div>
            <div className={s.inputWithIcon}>
              <input
                className={s.inputPass}
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                required
                onChange={this.handleChange}
              />
              <i className={s.iconPass} />
            </div>

            <button className={s.submitBtn} type="submit">
              Enter
            </button>
            <NavLink className={s.registerLink} activeClassName={s.activeLink} to="/registration">
              Register
            </NavLink>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
