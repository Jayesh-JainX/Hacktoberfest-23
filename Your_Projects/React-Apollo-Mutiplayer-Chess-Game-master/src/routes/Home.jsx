import React from 'react';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import GamesList from '../components/GamesList/GamesList';
import CardBox from '../components/CardBox/CardBox';

const QUERY = gql`
  {
    me {
      id
      chessGames {
        id
        playerOneID
        playerOneColor
        playerTwoID
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
      }
    }
    games {
      id
      playerOneID
      playerOneColor
      playerTwoID
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
    }
  }
`;

const CREATE_GAME = gql`
  mutation CreateGame {
    createGame {
      id
    }
  }
`;

const HomeRoute = () => {
  return (
    <div className="container">
      <h1>Dashboard</h1>

      <Query query={QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <LoadingSpinner
                message="Heroku server may take up to 30 seconds to wake up on first request"
                messageTimeout={3000}
              />
            );
          if (error) return <p className="message--error">{error.message}</p>;

          return (
            <div className="row">
              <div className="col-md-6">
                <CardBox>
                  <h5>Your active games:</h5>
                  <GamesList
                    me={data.me.id}
                    games={data.me.chessGames.filter(game => !game.gameOver)}
                  />
                </CardBox>
              </div>
              <div className="col-md-6">
                <CardBox>
                  <h5>Open games:</h5>
                  <GamesList
                    me={data.me.id}
                    games={data.games.filter(
                      game =>
                        game.playerOneID !== data.me.id && !game.playerTwoID
                    )}
                  />
                </CardBox>
              </div>
            </div>
          );
        }}
      </Query>

      <Mutation mutation={CREATE_GAME}>
        {(createGame, { loading, error, data }) => (
          <>
            {loading && <LoadingSpinner />}
            {error && <p className="message--error">{error.message}</p>}
            {data && <Redirect to={`/play-chess/${data.createGame.id}`} />}

            <span onClick={createGame} className="btn btn--secondary btn--xl">
              Start a new game
            </span>
          </>
        )}
      </Mutation>
    </div>
  );
};

export default HomeRoute;
