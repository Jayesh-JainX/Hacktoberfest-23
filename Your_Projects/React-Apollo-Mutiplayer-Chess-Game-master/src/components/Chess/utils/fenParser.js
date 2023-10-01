/**
 * Get chess piece color from string
 * @param {String} string example - "P@A4"
 * @return {String} piece color, example 'w'
 */
const getPieceColor = string => {
  if (!string) {
    return null;
  }
  return string.charCodeAt(0) >= 97 ? 'b' : 'w';
};

class FenParser {
  constructor(fen = null) {
    this._board = null;
    this.fen = fen;
  }

  /**
   * Get/Set FEN string
   */
  set fen(fen) {
    if (fen !== null) {
      this._parse(fen);
    }
    this._fen = fen;
  }

  get fen() {
    return this._fen;
  }

  set board(board) {
    this._board = board;
  }

  get board() {
    return this._board;
  }

  /**
   * Validates and parses FEN string
   */
  _parse(fen) {
    const fenRegex = /^\s*(?<board>[prnbqkPRNBQK12345678]{1,8}(\/[prnbqkPRNBQK12345678]{1,8}){7})\s+(?<color>[wb]{1})\s+(?<castling>[KQkq]{1,4}|-)(\s+(?<enpass>[a-h][36]|-))(\s+(?<halfMoves>\d{1,4}))?(\s+(?<fullMoves>\d{1,4}))?\s*$/;
    const fenMatch = fen.match(fenRegex);
    this.isValid = !!fenMatch;

    if (this.isValid === true) {
      const { board } = fenMatch.groups;

      // Build board matrix with "type@position" strings
      this.board = board.split('/').map((rows, y) => {
        return rows
          .replace(/[1-8]+/g, i => '-'.repeat(i))
          .split('')
          .map((piece, x) => {
            if (piece === '-') {
              return null;
            }
            return { type: piece.toLowerCase(), color: getPieceColor(piece) };
          });
      });
    }
  }
}

export default FenParser;
