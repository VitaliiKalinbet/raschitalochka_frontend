import React, { Component } from 'react';
import Registration from '../../components/Registration/Registration';
import styles from './RegistrationPage.module.css';

class RegistrationPage extends Component {
  state = {};

  render() {
    return (
      <div className={styles.main}>
        <h2>RegistrationPage</h2>
        <Registration />
      </div>
    );
  }
}

export default RegistrationPage;
