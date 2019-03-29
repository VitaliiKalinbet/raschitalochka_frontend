import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Registration from '../../components/Registration/Registration';
import styles from './RegistrationPage.module.css';
import logo from './logo.png';

class RegistrationPage extends Component {
  state = {};

  handSuccesRedirectyToLogin = () => {
    const { history } = this.props;
    return history.push('/login');
  };

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <p className={styles.leftTitle}>
              <img className={styles.logo} src={logo} alt="logo" />
              Raschitalochka
            </p>
            <p className={styles.leftText}>Create your own categories of costs</p>
          </div>
        </div>
        <div className={styles.right}>
          <Registration handSuccesRedirectyToLogin={this.handSuccesRedirectyToLogin} />
        </div>
      </div>
    );
  }
}

RegistrationPage.defaultProps = {
  history: {}
};

RegistrationPage.propTypes = {
  history: PropTypes.objectOf
};

export default RegistrationPage;
