import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import styles from './GamesList.module.scss';

const JOIN_GAME_MUTATION = gql`
  mutation JoinGame($id: ID!) {
    joinGame(id: $id) {
      id
    }
  }
`;

const GamesList = ({ me, games }) => {
  if (games.length === 0) {
    return <p>No games to show</p>;
  }

  // Returns the player chess color or null if player is not playing
  const getPlayerColor = game => {
    if (game.playerOneID === me) {
      return game.playerOneColor;
    } else if (game.playerTwoID === me) {
      return game.playerTwoColor;
    }
    return null;
  };

  return (
    <ul className={styles['GamesList']}>
      {games.map((game, index) => (
        <li key={index}>
          <div>{index + 1}.</div>
          <div className={styles['Players']}>
            <span className={styles['Player']}>{game.playerOne.username}</span>
            <span>vs</span>
            {game.playerTwo ? (
              <span className={styles['Player']}>
                {game.playerTwo.username}
              </span>
            ) : (
              <span
                className={[styles['Player'], styles['Player--Pending']].join(
                  ' '
                )}
              >
                waiting
              </span>
            )}
          </div>
          <div className={styles['Actions']}>
            {getPlayerColor(game) === null ? (
              <Mutation mutation={JOIN_GAME_MUTATION}>
                {(joinGame, { loading, error, data }) => (
                  <>
                    {loading && <LoadingSpinner />}
                    {error && <p className="message--error">{error.message}</p>}
                    {data && (
                      <Redirect to={`/play-chess/${data.joinGame.id}`} />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        joinGame({ variables: { id: game.id } });
                      }}
                      className="btn btn--sm btn--secondary"
                    >
                      Join game
                    </button>
                  </>
                )}
              </Mutation>
            ) : (
              <Link
                to={`/play-chess/${game.id}`}
                className="btn btn--sm btn--secondary"
              >
                Play
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
