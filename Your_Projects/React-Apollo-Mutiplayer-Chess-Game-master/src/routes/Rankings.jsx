import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const query = gql`
  {
    users {
      id
      username
      eloRating
    }
  }
`;

class RankingsRoute extends Component {
  state = {
    loading: true,
    users: null,
    error: null
  };

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const { client } = this.props;
    try {
      const response = await client.query({ query });
      this.setState({
        users: response.data.users,
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
    const { users, error, loading } = this.state;
    return (
      <div className="container">
        <h1>Rankings</h1>

        {loading && <LoadingSpinner />}
        {error && <p className="message--error">{error.message}</p>}

        {users && (
          <div className="users-list">
            {users.length === 0 && <p className="message">No users to list</p>}
            <ul>
              {users
                .sort((a, b) => b.eloRating - a.eloRating)
                .map((user, index) => (
                  <li key={user.id}>
                    <span>{index + 1}.</span>
                    <span>
                      <strong>{user.username}</strong>
                    </span>
                    <span> - </span>
                    <span>
                      rating: <strong>{user.eloRating}</strong>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default withApollo(RankingsRoute);
