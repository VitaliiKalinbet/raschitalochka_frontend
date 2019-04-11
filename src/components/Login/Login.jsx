import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import withAuth from '../../hoc/withAuth';
import withWidth from '../../hoc/withWidth';
import logo from '../../assets/images/logo.svg';

import s from './Login.module.css';

const slogan = <p className={s.slogan}>Manage your budget with finance app</p>;
class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount() {
    window.addEventListener('keydown', this.pressEnter.bind(this));
  }

  componentDidUpdate() {
    const { isAuthenticated, location, history } = this.props;

    const { from } = location.state || { from: { pathname: '/dashboard' } };

    if (isAuthenticated) {
      history.push({
        pathname: from.pathname,
        state: { from: location }
      });
    }
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.pressEnter.bind(this));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
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

  render() {
    const { email, password } = this.state;
    const { width, user } = this.props;
    return (
      <div className={s.container}>
        {width >= 1024 && <div className={s.bgWrap}>{slogan}</div>}
        <div className={s.formWrapper}>
          <form className={s.form} onSubmit={this.handleSubmit}>
            <div className={s.logoWrap}>
              <img className={s.logo} src={logo} alt="app logo" />
              <h1 className={s.formTitle}>Raschitalochka</h1>
            </div>
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
            {user.error ? <p className={s.errorMsg}>{user.error}</p> : ''}
          </form>
          {width >= 768 && width < 1024 && slogan}
        </div>
      </div>
    );
  }
}
Login.defaultProps = {
  user: PropTypes.shape({
    error: null
  })
};

Login.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  user: PropTypes.shape({
    error: PropTypes.string
  })
};

export default withAuth(withWidth(Login));
