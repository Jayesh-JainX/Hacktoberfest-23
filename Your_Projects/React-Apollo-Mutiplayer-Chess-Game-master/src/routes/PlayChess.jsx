import React, { Component } from 'react';
import { Query, Subscription, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Chess from '../components/Chess/Chess';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const QUERY = gql`
  query Game($id: ID!) {
    me {
      id
    }
    game(id: $id) {
      id
      playerOneID
      playerTwoID
      playerOneColor
      playerTwoColor
      playerOne {
        username
      }
      playerTwo {
        username
      }
      startDate
      started
      gameOver
      fen
      pgn
    }
  }
`;

const MAKE_MOVE_MUTATION = gql`
  mutation MakeMove($id: ID!, $move: String!) {
    makeMove(id: $id, move: $move) {
      id
    }
  }
`;

const MOVE_MADE_SUBSCRIPTION = gql`
  subscription chessMoveMade($id: ID!) {
    chessMoveMade(id: $id) {
      id
      playerOneID
      playerTwoID
      playerOneColor
      playerTwoColor
      playerOne {
        username
      }
      playerTwo {
        username
      }
      startDate
      started
      gameOver
      fen
      pgn
    }
  }
`;

class PlayChessRoute extends Component {
  constructor(props) {
    super(props);
    this.makeMove = this.makeMove.bind(this);
  }

  async makeMove(move) {
    const { match, client } = this.props;
    const gameId = match.params.id;

    try {
      await client.mutate({
        mutation: MAKE_MOVE_MUTATION,
        variables: {
          id: gameId,
          move: move.san
        }
      });
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    const { match } = this.props;
    const gameId = match.params.id;

    // Returns the player chess color or null if player is not playing
    const getPlayerColor = (playerId, game) => {
      if (game.playerOneID === playerId) {
        return game.playerOneColor;
      } else if (game.playerTwoID === playerId) {
        return game.playerTwoColor;
      }
      return null;
    };

    return (
      <div className="container">
        <Query query={QUERY} variables={{ id: gameId }}>
          {query => (
            <>
              {query.loading && <LoadingSpinner />}
              {query.error && (
                <p className="message--error">
                  Query error {query.error.message}
                </p>
              )}
              {query.data && query.data.game && (
                <Subscription
                  subscription={MOVE_MADE_SUBSCRIPTION}
                  variables={{ id: gameId }}
                >
                  {({ data }) => {
                    const game = data ? data.chessMoveMade : query.data.game;
                    return (
                      <>
                        {game.started === false && (
                          <LoadingSpinner message="Waiting for player 2" />
                        )}

                        <h4>
                          {game.playerOne.username} vs{' '}
                          {game.playerTwo ? game.playerTwo.username : null}
                        </h4>

                        <Chess
                          fen={game.fen}
                          pgn={game.pgn}
                          playerColor={getPlayerColor(
                            query.data.me.id,
                            query.data.game
                          )}
                          onChessMove={move => {
                            this.makeMove(move);
                          }}
                        />
                      </>
                    );
                  }}
                </Subscription>
              )}
            </>
          )}
        </Query>
      </div>
    );
  }
}

export default withApollo(PlayChessRoute);
