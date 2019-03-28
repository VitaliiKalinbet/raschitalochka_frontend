import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import withUserData from '../../hoc/withUserData';
// import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

import Home from '../Home/Home';
import Diagram from '../Diagram/Diagram';

import * as API from '../../services/api';

class Main extends Component {
  state = {
    data: []
  };

  componentDidUpdate(prevProps) {
    const { user, token } = this.props;
    if (user !== null && prevProps !== this.props) {
      API.getFinanceById(user.id, token).then(({ data }) => this.setState({ data: data.finance.data }));
    }
  }

  render() {
    const { data } = this.state;
    return (
      <Switch>
        <Route path="/dashboard/home" render={() => <Home financeData={data} />} />
        <Route path="/dashboard/diagram" render={() => <Diagram financeData={data} />} />
      </Switch>
    );
  }
}

Main.defaultProps = {
  user: null,
  token: null
};

Main.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string
  }),
  token: PropTypes.string
};
const mstp = state => {
  return {
    user: state.session.user,
    token: state.session.token
  };
};

export default connect(mstp)(Main);
