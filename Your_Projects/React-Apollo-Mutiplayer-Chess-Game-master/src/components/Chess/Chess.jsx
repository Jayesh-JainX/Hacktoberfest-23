import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chess from 'chess.js';

import Board from './Board/Board';
import Piece from './Piece/Piece';

import { fenParser } from './utils';
import { ChessContextProvider } from './ChessContext';
import GameInfo from './GameInfo/GameInfo';

class ChessGame extends Component {
  state = {
    chess: new Chess(),
    board: [],
    history: [],
    fallenSoldiers: [],
    turn: 'w',
    gameOver: false,
    victoryType: null,
    winner: null
  };

  constructor(props) {
    super(props);
    this.handleChessMove = this.handleChessMove.bind(this);
  }

  componentDidMount() {
    const { fen, pgn } = this.props;
    this.updateChessEngine(fen, pgn);
  }

  componentWillReceiveProps(nextProps) {
    const { fen, pgn } = nextProps;
    this.updateChessEngine(fen, pgn);
  }

  updateChessEngine(fen = null, pgn = null) {
    const { chess } = this.state;

    if (fen !== null) {
      chess.load(fen);
    }
    if (pgn !== null) {
      chess.load_pgn(pgn);
    }

    const board = new fenParser(chess.fen()).board;
    const history = chess.history({ verbose: true });
    const turn = chess.turn();

    // Build fallen soldiers from move history
    const fallenSoldiers = history
      .filter(move => move.captured)
      .map(move => {
        return { color: move.color === 'w' ? 'b' : 'w', piece: move.captured };
      });

    this.setState({
      chess,
      board,
      history,
      fallenSoldiers,
      turn
    });

    this.checkIfGameOver();
  }

  handleChessMove(move) {
    const { chess } = this.state;
    chess.move(move);

    this.setState({ chess });
    this.updateChessEngine();

    this.props.onChessMove(move);
  }

  checkIfGameOver() {
    const { chess } = this.state;
    const gameOver = chess.game_over();
    const turn = chess.turn();

    if (gameOver) {
      let victoryType;
      let winner = null;
      if (chess.in_checkmate()) {
        victoryType = 'checkmate';
        winner = turn === 'w' ? 'b' : 'w';
      } else if (chess.in_draw()) {
        victoryType = 'draw';
      } else if (chess.in_stalemate()) {
        victoryType = 'stalemate';
      } else if (chess.in_threefold_repetition()) {
        victoryType = 'threefold repetition';
      } else if (chess.insufficient_material()) {
        victoryType = 'insufficient material';
      }

      this.setState({
        gameOver,
        victoryType,
        winner
      });
    }
  }

  render() {
    const {
      chess,
      board,
      history,
      turn,
      fallenSoldiers,
      gameOver,
      victoryType,
      winner
    } = this.state;
    const { playerColor } = this.props;

    // Reverse the chess board when player color is black
    const isReversed = playerColor === 'b';

    return (
      <ChessContextProvider>
        <div className="row">
          <div className="col-md-7">
            <Board reversed={isReversed}>
              {board.map((row, y) =>
                row.map(
                  (piece, x) =>
                    piece !== null && (
                      <Piece
                        key={y + x}
                        piece={{ ...piece, x, y }}
                        chess={chess}
                        playerColor={playerColor}
                        reversed={isReversed}
                        onMove={this.handleChessMove}
                      />
                    )
                )
              )}
            </Board>
          </div>
          <div className="col-md-5">
            <GameInfo
              turn={turn}
              history={history}
              fallenSoldiers={fallenSoldiers}
              gameOver={gameOver}
              victoryType={victoryType}
              winner={winner}
            />
          </div>
        </div>
      </ChessContextProvider>
    );
  }
}

ChessGame.propTypes = {
  fen: PropTypes.string,
  pgn: PropTypes.string,
  playerColor: PropTypes.string,
  onMove: PropTypes.func
};

ChessGame.defaultProps = {
  fen: null,
  pgn: null,
  playerColor: null,
  onMove: () => {}
};

export default ChessGame;
