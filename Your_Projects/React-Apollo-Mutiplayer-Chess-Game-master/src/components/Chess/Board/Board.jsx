import React, { Component } from 'react';

import ChessBoardLegend from './BoardLegend';
import BoardSquare from './BoardSquare';

import ChessContext from '../ChessContext';
import styles from './Board.module.scss';

import { buildChessMatrix } from '../utils';

class ChessBoard extends Component {
  static contextType = ChessContext;

  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver(event) {
    const { reversed } = this.props;
    const { setHoveredSquare } = this.context;

    const board = this.boardRef.current;

    const clientRect = board.getBoundingClientRect();
    const boardTop = clientRect.top;
    const boardLeft = clientRect.left;
    const squareWidth = clientRect.width / 8;

    const mouseX = event.clientX - boardLeft;
    const mouseY = event.clientY - boardTop;

    let hoveredSquareX = Math.floor(mouseX / squareWidth);
    let hoveredSquareY = Math.floor(mouseY / squareWidth);
    if (reversed === true) {
      hoveredSquareX = 7 - hoveredSquareX;
      hoveredSquareY = 7 - hoveredSquareY;
    }

    setHoveredSquare(hoveredSquareX, hoveredSquareY);
  }

  render() {
    const { reversed } = this.props;
    const { hoveredSquare, setHoveredSquare } = this.context;

    let { children } = this.props;
    if (!children || !children.length) {
      children = [];
    }

    const boardMatrix = buildChessMatrix(8);

    return (
      <section
        className={[
          styles['Board'],
          reversed === true ? styles['Board--Reversed'] : null
        ].join(' ')}
      >
        <ChessBoardLegend
          activeX={hoveredSquare.x}
          activeY={hoveredSquare.y}
          reversed={reversed}
        />

        <div
          ref={this.boardRef}
          className={styles['Board__Inner']}
          onMouseMove={e => this.handleMouseOver(e)}
          onMouseLeave={() => setHoveredSquare(null, null)}
        >
          <div className={styles['Board__Columns']}>
            {boardMatrix.map((col, x) => (
              <div key={x} className={styles['Board__Column']}>
                {col.map((row, y) => (
                  <BoardSquare key={x + y} x={x} y={y} index={x + y} />
                ))}
              </div>
            ))}
          </div>

          {children}
        </div>
      </section>
    );
  }
}

export default ChessBoard;
