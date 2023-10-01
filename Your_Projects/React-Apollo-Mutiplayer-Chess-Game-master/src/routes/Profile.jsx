import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const query = gql`
  {
    me {
      id
      firstName
      lastName
      email
      username
    }
  }
`;

class ProfileRoute extends Component {
  state = {
    loading: true,
    user: null,
    error: null
  };

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const { client } = this.props;
    try {
      const response = await client.query({ query });
      console.log(response);
      this.setState({
        user: response.data.me,
        loading: false
      });
    } catch (error) {
      this.setState({
        error,
        loading: false
      });
    }
  }

  render() {
    const { user, error, loading } = this.state;
    return (
      <div className="container">
        <h1>My Profile</h1>

        {loading && <LoadingSpinner />}
        {error && <p className="message--error">{error.message}</p>}

        {user && (
          <div className="user-profile">
            <p>
              <strong>Username</strong> {user.username}
              <br />
              <strong>Email</strong> {user.email}
              <br />
              <strong>First name:</strong> {user.firstName}
              <br />
              <strong>Last name:</strong> {user.lastName}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withApollo(ProfileRoute);
