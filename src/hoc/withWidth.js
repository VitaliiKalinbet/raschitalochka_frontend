import React, { Component } from 'react';

const withWidth = WrappedComponent => {
  class WithWidth extends Component {
    state = {
      width: window.innerWidth
    };

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    updateDimensions() {
      this.setState({ width: window.innerWidth });
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  return WithWidth;
};

export default withWidth;
