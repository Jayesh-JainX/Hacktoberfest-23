import React from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import LayoutContext from '../layout/LayoutContext';
import SignupForm from '../components/SignupForm/SignupForm';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const SIGNUP_MUTATION = gql`
  mutation Register(
    $username: String!
    $password: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    register(
      username: $username
      password: $password
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

const SignupRoute = () => {
  return (
    <div className="container">
      <LayoutContext.Consumer>
        {({ authenticate, authenticated }) => {
          if (authenticated === true) {
            return <Redirect to="/" />;
          }
          return (
            <Mutation mutation={SIGNUP_MUTATION}>
              {(register, { loading, error, data }) => {
                if (data && data.register.token) {
                  authenticate(data.register.token);
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
                    <SignupForm
                      onSubmit={(
                        username,
                        password,
                        email,
                        firstName,
                        lastName
                      ) =>
                        register({
                          variables: {
                            username,
                            password,
                            email,
                            firstName,
                            lastName
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

export default SignupRoute;
