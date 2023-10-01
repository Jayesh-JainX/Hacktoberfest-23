import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import GameHistory from '../components/GameHistory/GameHistory';

const query = gql`
  {
    games {
      id
      playerOne {
        username
      }
      playerTwo {
        username
      }
      winner {
        username
      }
      playerOneID
      playerTwoID
      playerOneColor
      playerTwoColor
      startDate
      endDate
      fen
      pgn
      gameOver
      victoryType
    }
  }
`;

class GameHistoryRoute extends Component {
  state = {
    loading: true,
    games: null,
    error: null
  };

  componentDidMount() {
    this.fetchGames();
  }

  async fetchGames() {
    const { client } = this.props;
    try {
      const response = await client.query({ query });
      this.setState({
        games: response.data.games,
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
    const { games, error, loading } = this.state;
    return (
      <div className="container">
        <h1>Game History</h1>

        {loading && <LoadingSpinner />}
        {error && <p className="message--error">{error.message}</p>}
        {games && (
          <GameHistory games={games.filter(game => game.gameOver === true)} />
        )}
      </div>
    );
  }
}

export default withApollo(GameHistoryRoute);
