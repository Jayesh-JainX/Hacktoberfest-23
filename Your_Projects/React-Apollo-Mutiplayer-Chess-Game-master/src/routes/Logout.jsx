import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import LayoutContext from '../layout/LayoutContext';

class LogoutRoute extends Component {
  componentDidMount() {
    const { client } = this.props;
    client.resetStore();
    this.context.logout();
  }

  render() {
    return <Redirect to="/login" />;
  }
}

LogoutRoute.contextType = LayoutContext;

export default withApollo(LogoutRoute);
