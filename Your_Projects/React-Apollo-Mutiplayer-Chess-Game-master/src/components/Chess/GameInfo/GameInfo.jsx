import React from 'react';

import {
  SvgBishopBlack,
  SvgBishopWhite,
  SvgKingBlack,
  SvgKingWhite,
  SvgKnightBlack,
  SvgKnightWhite,
  SvgPawnBlack,
  SvgPawnWhite,
  SvgQueenBlack,
  SvgQueenWhite,
  SvgRookBlack,
  SvgRookWhite
} from '../Piece/Icons';

import styles from './GameInfo.module.scss';

const CHESS_ICONS = {
  w: {
    k: <SvgKingWhite />,
    q: <SvgQueenWhite />,
    b: <SvgBishopWhite />,
    n: <SvgKnightWhite />,
    r: <SvgRookWhite />,
    p: <SvgPawnWhite />
  },
  b: {
    k: <SvgKingBlack />,
    q: <SvgQueenBlack />,
    b: <SvgBishopBlack />,
    n: <SvgKnightBlack />,
    r: <SvgRookBlack />,
    p: <SvgPawnBlack />
  }
};

const GameInfo = ({
  turn,
  history,
  fallenSoldiers,
  gameOver,
  victoryType,
  winner
}) => {
  return (
    <article className={styles['GameInfo']}>
      {gameOver && (
        <div className={styles['GameInfo__Item']}>
          <h6>Game over:</h6>
          <div className={styles['GameOver']}>
            {victoryType === 'checkmate' ? (
              <p>
                {winner === 'w' ? <span>White</span> : <span>Black</span>} won
                by {victoryType}
              </p>
            ) : (
              <p>{victoryType}</p>
            )}
          </div>
        </div>
      )}

      <div className={styles['GameInfo__Item']}>
        <h6>Current turn:</h6>
        <div
          className={[
            styles['Turn'],
            turn === 'w' ? styles['Turn--White'] : styles['Turn--Black']
          ].join(' ')}
        />
      </div>

      <div className={styles['GameInfo__Item']}>
        <h6>Fallen soldiers:</h6>
        <ul className={styles['Chess__Icons']}>
          {fallenSoldiers
            .filter(piece => piece.color === 'w')
            .map((piece, index) => {
              const icon = CHESS_ICONS['w'][piece.piece];
              return (
                <li key={index} className={styles['Chess__Icon']}>
                  {icon}
                </li>
              );
            })}
        </ul>
        <ul className={styles['Chess__Icons']}>
          {fallenSoldiers
            .filter(piece => piece.color === 'b')
            .map((piece, index) => {
              const icon = CHESS_ICONS['b'][piece.piece];
              return (
                <li key={index} className={styles['Chess__Icon']}>
                  {icon}
                </li>
              );
            })}
        </ul>
      </div>
    </article>
  );
};

export default GameInfo;
