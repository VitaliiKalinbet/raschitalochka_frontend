import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import withAuth from '../../hoc/withAuth';

import s from './Login.module.css';

const slogan = <p className={s.slogan}>Manage your budget with finance app</p>;
class Login extends Component {
  state = {
    email: '',
    password: '',
    width: 800
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
    window.addEventListener('keydown', this.pressEnter.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
    window.addEventListener('keydown', this.pressEnter.bind(this));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    /* eslint-disable react/prop-types */
    const { login } = this.props;
    login({ email, password });
    this.setState({
      email: '',
      password: ''
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  pressEnter = e => {
    const { email, password } = this.state;
    if (email === '' || password === '') return;
    if (e.code === 'Enter') this.handleSubmit(e);
  };

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { email, password, width } = this.state;
    return (
      <div className={s.wrap}>
        {width >= 1280 && <div className={s.bgWrap}>{slogan}</div>}
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
                autoComplete="username"
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
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              <i className={s.iconPass} />
            </div>
            <Button style={s.submitBtn} type="submit" value="Enter" />
            <Link className={s.registerLink} to="/registration">
              Register
            </Link>
          </form>
          {width >= 768 && width < 1280 && slogan}
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
