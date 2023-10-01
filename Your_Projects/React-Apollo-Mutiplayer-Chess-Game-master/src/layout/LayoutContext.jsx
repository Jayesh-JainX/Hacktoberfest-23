// Context.js
import React from 'react';
import AuthGuard from '../auth/AuthGuard';

const defaultContextValue = {
  authenticated: false,
  token: null,
  authenticate: () => {},
  logout: () => {}
};

const LayoutContext = React.createContext(defaultContextValue);

class LayoutContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);

    const token = AuthGuard.isAuthenticated();

    this.state = {
      token: token ? token : null,
      authenticated: token ? true : false,
      authenticate: this.authenticate,
      logout: this.logout
    };
  }

  authenticate(token) {
    AuthGuard.authenticate(token);
    this.setState({
      authenticated: true,
      token: token
    });
  }

  logout() {
    AuthGuard.clear();
    this.setState({
      authenticated: false,
      token: null
    });
  }

  render() {
    return (
      <LayoutContext.Provider value={this.state}>
        {this.props.children}
      </LayoutContext.Provider>
    );
  }
}

export { LayoutContext as default, LayoutContextProvider };
