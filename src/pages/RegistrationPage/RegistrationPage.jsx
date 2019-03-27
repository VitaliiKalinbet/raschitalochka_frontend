import React, { Component } from 'react';
import Registration from '../../components/Registration/Registration';
import styles from './RegistrationPage.module.css';

class RegistrationPage extends Component {
  state = {};

  render() {
    return (
      <div className={styles.main}>
        <Registration />
      </div>
    );
  }
}

export default RegistrationPage;
