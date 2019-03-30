import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, getToken } from '../../redux/reducers/session/sessionSelectors';

import Home from '../Home/Home';
import Diagram from '../Diagram/Diagram';

import { getChartData, getCategoriesArr, getTotalByType } from './functions';
import { options } from './config';
import * as API from '../../services/api';

class Main extends Component {
  state = {
    data: [],
    totalCosts: 0,
    totalIncome: 0,
    width: window.innerWidth,
    error: ''
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps) {
    const { user, token } = this.props;
    if (user !== null && prevProps !== this.props) {
      API.getFinanceById(user.id, token)
        .then(({ data }) => getCategoriesArr(data.finance.data))
        .then(data => this.setStateData(data))
        .catch(error => this.setState({ error }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  setStateData = data => {
    return this.setState({
      data,
      totalCosts: getTotalByType(data, '+'),
      totalIncome: getTotalByType(data, '-')
    });
  };

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { data, error, width, totalCosts, totalIncome } = this.state;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        <Switch>
          <Route path="/dashboard/home" render={() => <Home data={data} />} />
          <Route
            path="/dashboard/diagram"
            render={() => (
              <Diagram
                data={data}
                options={options}
                chartData={getChartData(data)}
                totalCosts={totalCosts}
                totalIncome={totalIncome}
                width={width}
              />
            )}
          />
        </Switch>
      </>
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
  token: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
const mstp = state => {
  return {
    user: getUser(state),
    token: getToken(state)
  };
};

export default connect(mstp)(Main);
