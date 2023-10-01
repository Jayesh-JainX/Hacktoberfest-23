import React from 'react';
import Moment from 'react-moment';

import styles from './GameHistory.module.scss';

const GameHistory = ({ games }) => {
  if (games.length === 0) {
    return <p>No games to show</p>;
  }

  return (
    <ul className={styles['GameHistory']}>
      {games.map((game, index) => (
        <li key={index}>
          <div>{index + 1}.</div>
          <div className={styles['Players']}>
            <span className={styles['Player']}>{game.playerOne.username}</span>
            <span>vs</span>
            <span className={styles['Player']}>{game.playerTwo.username}</span>
          </div>
          <div className={styles['Date']}>
            <span>
              <Moment date={game.startDate} format="YYYY/MM/DD - hh:mm" /> -{' '}
              <Moment date={game.endDate} format="YYYY/MM/DD - hh:mm" />
            </span>
          </div>
          <div className={styles['Winner']}>
            {game.winner && <span>{game.winner.username} won by</span>}
            &nbsp;
            {game.victoryType}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GameHistory;
