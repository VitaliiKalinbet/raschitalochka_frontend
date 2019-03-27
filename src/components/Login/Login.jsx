import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import withAuth from '../../services/hoc/withAuth';

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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    /* eslint-disable react/prop-types */
    const { login } = this.props;
    login({ email, password });

    // console.log(this.props);
    // this.setState({
    //   email: '',
    //   password: ''
    // });
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
            <Button style={s.submitBtn} type="button" value="Enter" />
            <Link className={s.registerLink} activeClassName={s.activeLink} to="/registration">
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
