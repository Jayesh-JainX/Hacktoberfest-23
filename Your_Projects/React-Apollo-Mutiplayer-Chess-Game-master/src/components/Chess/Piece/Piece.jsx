import React, { Component } from 'react';
import Draggable from 'react-draggable';

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
} from './Icons';

import ChessContext from '../ChessContext';

import styles from './Piece.module.scss';
import { encodeChessPosition, decodeChessPosition } from '../utils';

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

class ChessPiece extends Component {
  static contextType = ChessContext;

  handleDragStart() {
    const { setDraggingPiece, setLegalMoves } = this.context;
    const { piece, chess } = this.props;

    const square = encodeChessPosition(piece.x, piece.y).toLowerCase();
    const legalMoves = chess.moves({ square, verbose: true }).map(move => {
      const { x, y } = decodeChessPosition(move.to);
      return {
        ...move,
        x,
        y
      };
    });

    setDraggingPiece(piece);
    setLegalMoves(legalMoves);
  }

  handleDragStop() {
    const {
      legalMoves,
      setDraggingPiece,
      setLegalMoves,
      hoveredSquare
    } = this.context;

    setDraggingPiece();
    setLegalMoves();

    // Validate if move is legal
    const { x, y } = hoveredSquare;
    const { onMove } = this.props;
    const legalMove = legalMoves.find(
      square => square.x === x && square.y === y
    );
    if (legalMove) {
      // Async call to prevent Draggable state update on unmounted component
      setTimeout(() => onMove(legalMove));
    }
  }

  render() {
    const { playerColor, reversed } = this.props;
    const { color, x, y, type } = this.props.piece;
    const { selectedPiece } = this.context;

    const chessPieceIcon = CHESS_ICONS[color][type];
    const classes = [];

    const cssLeft = reversed === true ? `${(7 - x) * 12.5}%` : `${x * 12.5}%`;
    const cssTop = reversed === true ? `${(7 - y) * 12.5}%` : `${y * 12.5}%`;

    if (color === 'w') {
      classes.push(styles['Chess__Piece--White']);
    } else {
      classes.push(styles['Chess__Piece--Black']);
    }

    if (selectedPiece.x === x && selectedPiece.y === y) {
      classes.push(styles['Chess__Piece--Selected']);
    }

    return (
      <Draggable
        axis="both"
        bounds="parent"
        position={{ x: 0, y: 0 }}
        onStart={() => this.handleDragStart(x, y)}
        onStop={() => this.handleDragStop(x, y)}
        disabled={playerColor !== null && playerColor !== color}
      >
        <div
          className={[styles.Chess__Piece, ...classes].join(' ')}
          style={{
            top: cssTop,
            left: cssLeft
          }}
        >
          {chessPieceIcon}
        </div>
      </Draggable>
    );
  }
}

export default ChessPiece;
