import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import withUserData from '../../hoc/withUserData';
import { getUser, getToken, getIsAuthenticated } from '../../redux/reducers/session/sessionSelectors';

import Home from '../Home/Home';
import Diagram from '../Diagram/Diagram';

import * as API from '../../services/api';

const colors = [
  'rgb(236, 178, 42)',
  'rgb(226, 139, 32)',
  'rgb(210, 89, 37)',
  'rgb(103, 183, 208)',
  'rgb(85, 147, 215)',
  'rgb(255, 171, 0)',
  'rgb(156, 194, 84)',
  'rgb(115, 173, 87)',
  'rgb(80, 124, 58)',
  'rgb(60, 124, 58)',
  'rgb(40, 100, 58)',
  'rgb(20, 124, 100)'
];

class Main extends Component {
  state = {
    data: [],
    totalCosts: 0,
    totalIncome: 0,
    width: 800
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated, location, history } = this.props;

    const { from } = location.state || { from: { pathname: '/login' } };

    if (!isAuthenticated) {
      history.push({
        pathname: from.pathname,
        state: { from: location }
      });
    }

    const { user, token } = this.props;
    if (user !== null && prevProps !== this.props) {
      API.getFinanceById(user.id, token)
        .then(res => this.getCategoriesArr(res.data.finance.data))
        .then(data => this.setStateData(data));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  setStateData = data => {
    return this.setState({
      data,
      totalCosts: this.getTotalByType(data, '+'),
      totalIncome: this.getTotalByType(data, '-')
    });
  };

  getCategoriesArr = arr => arr.filter(data => data.comments !== '');

  getTotalByType = (arr, type) => {
    return arr.reduce((sum, item) => {
      return item.type !== type ? sum : sum + item.amount;
    }, 0);
  };

  getTotalIncomeArr = arr =>
    arr.reduce((acc, item) => {
      return item.type !== '-' ? acc : acc.push(item);
    }, []);

  getChartData = arr => {
    // const labelsArr = arr.map(item => item.category);
    const amountArr = arr.map(item => item.amount);
    return {
      // labels: labelsArr,
      datasets: [
        {
          data: amountArr,
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }
      ]
    };
  };

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { data, totalCosts, totalIncome, width } = this.state;
    return (
      <Switch>
        <Route path="/dashboard/home" render={() => <Home data={data} />} />
        <Route
          path="/dashboard/diagram"
          render={() => (
            <Diagram
              data={data}
              chartData={this.getChartData(data)}
              totalCosts={totalCosts}
              totalIncome={totalIncome}
              width={width}
            />
          )}
        />
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
  token: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
const mstp = state => {
  return {
    user: getUser(state),
    token: getToken(state),
    isAuthenticated: getIsAuthenticated(state)
  };
};

export default connect(mstp)(Main);
