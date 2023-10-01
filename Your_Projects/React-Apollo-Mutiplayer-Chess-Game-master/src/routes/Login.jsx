import React from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import LayoutContext from '../layout/LayoutContext';
import LoginForm from '../components/LoginForm/LoginForm';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const LoginRoute = () => {
  return (
    <div className="container">
      <LayoutContext.Consumer>
        {({ authenticate, authenticated }) => {
          if (authenticated === true) {
            return <Redirect to="/" />;
          }
          return (
            <Mutation mutation={LOGIN_MUTATION}>
              {(login, { loading, error, data }) => {
                if (data && data.login.token) {
                  authenticate(data.login.token);
                  return <Redirect to={`/`} />;
                }

                return (
                  <>
                    {loading && (
                      <LoadingSpinner
                        message="Heroku server may take up to 30 seconds to wake up on first request"
                        messageTimeout={3000}
                      />
                    )}
                    <LoginForm
                      onSubmit={(username, password) =>
                        login({
                          variables: {
                            username,
                            password
                          }
                        })
                      }
                      error={error}
                    />
                  </>
                );
              }}
            </Mutation>
          );
        }}
      </LayoutContext.Consumer>
    </div>
  );
};

export default LoginRoute;
