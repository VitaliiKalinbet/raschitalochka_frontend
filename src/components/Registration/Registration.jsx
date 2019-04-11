import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import withWidth from '../../hoc/withWidth';
import { getIsAuthenticated } from '../../redux/reducers/session/sessionSelectors';
import logo from '../../assets/images/logo.svg';
import logoWite from '../../assets/images/registration/logo_white.png';
import closeIcon from '../../assets/images/registration/close.svg';
import { register } from '../../services/api';

import s from './Registration.module.css';

const getStyle = num => {
  if (num === 0) return s.lineStatus;
  if (num === 0.5) return s.halfLine;
  return s.fullLine;
};

const slogan = <p className={s.slogan}>Create your own categories of costs</p>;
const INITIAL_STATE = {
  email: '',
  password: '',
  confirmPass: '',
  name: '',
  lineState: 0,
  errorMsg: '',
  successMsg: ''
};
class Registration extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    window.addEventListener('keydown', this.pressEnter.bind(this));
  }

  componentDidUpdate() {
    const { isAuthenticated, location, history } = this.props;

    const { from } = location.state || { from: { pathname: '/dashboard/home' } };

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

  handleCheckPasswords = () => {
    const { password, confirmPass } = this.state;
    if (password.length >= 5 || confirmPass.length >= 5) {
      this.setState({ lineState: 0.5 });
    }

    if (password.length >= 5 && confirmPass.length >= 5 && password === confirmPass) {
      this.setState({ lineState: 1 });
    }

    if (password.length <= 5 && confirmPass.length <= 5) {
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

  handSuccesRedirectToLogin = () => {
    const { history } = this.props;
    return history.push('/login');
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, confirmPass, name, lineState } = this.state;
    if (!email || !password || !name) {
      return this.setState({ errorMsg: 'Please fill all fields' });
    }

    if (password.length <= 5 || confirmPass.length <= 5) {
      return this.setState({ errorMsg: 'Passwords are too short, please check it and try again' });
    }
    if (lineState !== 1) {
      return this.setState({ errorMsg: 'Passwords are not equals, please check it and try again' });
    }

    const data = JSON.stringify({ name, email, password });

    return register(data)
      .then(response => {
        if (response.status === 200) {
          const { message } = response.data;
          this.setState({ successMsg: message });
        } else {
          this.setState({ errorMsg: message });
        }

        setTimeout(() => {
          return this.handSuccesRedirectToLogin();
        }, 2000);
      })
      .then(this.setState({ ...INITIAL_STATE }))
      .catch(() => this.setState({ errorMsg: 'Failed to login' }));
  };

  pressEnter = e => {
    const { email, password } = this.state;
    if (email === '' || password === '') return;
    if (e.code === 'Enter') this.handleSubmit(e);
  };

  render() {
    const { email, password, confirmPass, name, lineState, errorMsg, successMsg } = this.state;
    const { width } = this.props;
    return (
      <div className={s.container}>
        {width >= 1024 && (
          <div className={s.bgWrap}>
            <div className={s.logoWrap}>
              <img className={s.logo} src={logoWite} alt="app logo" />
              <h1 className={s.formTitle}>Raschitalochka</h1>
            </div>
            {slogan}
          </div>
        )}
        <div className={s.formWrapper}>
          <form className={s.form} onSubmit={this.handleSubmit}>
            {width < 768 && (
              <div className={s.logoWrap}>
                <img className={s.logo} src={logo} alt="app logo" />
              </div>
            )}
            <h3 className={s.formTitle}>{width < 768 ? 'Raschitalochka' : 'Registration'}</h3>
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
            <div className={s.inputWithIcon}>
              <input
                className={s.inputConfirmPass}
                name="confirmPass"
                placeholder="Password Confirmation"
                type="password"
                value={confirmPass}
                required
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              <i className={s.iconPass} />
            </div>
            {/* eslint-disable-next-line */}
            <div className={getStyle(lineState)} />
            <div className={s.inputWithIcon}>
              <input
                className={s.inputName}
                name="name"
                placeholder="Your Name"
                type="text"
                value={name}
                required
                onChange={this.handleChange}
              />
              <i className={s.iconName} />
            </div>
            <Button style={s.submitBtn} type="submit" value="Register" />
            <Link className={s.loginLink} to="/login">
              Login
            </Link>
            {errorMsg && (
              <div className={s.errorMsg}>
                {errorMsg}
                <img
                  role="presentation"
                  onClick={this.handleCloseErrorMsg}
                  onKeyDown={() => null}
                  className={s.closeIcon}
                  src={closeIcon}
                  alt="closeIcon"
                />
              </div>
            )}
            {successMsg && <div className={s.successMsg}>{successMsg}</div>}
          </form>
        </div>
      </div>
    );
  }
}
Registration.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  width: PropTypes.number.isRequired
};

const mstp = state => ({
  isAuthenticated: getIsAuthenticated(state)
});

export default connect(mstp)(withWidth(Registration));
