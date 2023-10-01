import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthGuard from './AuthGuard';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthGuard.isAuthenticated() !== false ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default AuthRoute;
