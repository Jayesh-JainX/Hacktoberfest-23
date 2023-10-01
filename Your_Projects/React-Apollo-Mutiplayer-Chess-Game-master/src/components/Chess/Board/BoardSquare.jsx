import React, { Component } from 'react';

import ChessContext from '../ChessContext';
import styles from './BoardSquare.module.scss';

const isEven = num => num % 2 === 0;
const isOdd = num => num % 2 === 1;

class BoardSquare extends Component {
  static contextType = ChessContext;

  render() {
    const { x, y } = this.props;
    const {
      highlightedSquare,
      hoveredSquare,
      isDragging,
      legalMoves
    } = this.context;
    const isLegalSquare = legalMoves.find(
      square => square.x === x && square.y === y
    );
    const classes = [];

    // Square background
    if ((isEven(x) && isEven(y)) || (isOdd(x) && isOdd(y))) {
      classes.push(styles['Square--Light']);
    } else {
      classes.push(styles['Square--Dark']);
    }

    // Square effects
    if (highlightedSquare.x === x && highlightedSquare.y === y) {
      classes.push(styles['Square--Highlighted']);
    }
    if (isDragging === true && hoveredSquare.x === x && hoveredSquare.y === y) {
      classes.push(styles['Square--Hovered']);
    }
    if (isLegalSquare) {
      classes.push(styles['Square--Legal']);
    }

    return <div className={[styles['Square'], ...classes].join(' ')} />;
  }
}

export default BoardSquare;
